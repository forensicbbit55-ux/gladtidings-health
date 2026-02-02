-- Create stored procedures for common operations

-- Toggle remedy featured status
CREATE OR REPLACE FUNCTION toggle_remedy_featured(remedy_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  featured BOOLEAN,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    UPDATE natural_remedies 
    SET featured = NOT featured, updated_at = NOW()
    WHERE id = remedy_id
    RETURNING id, name, featured, updated_at;
END;
$$ LANGUAGE plpgsql;

-- Toggle user active status
CREATE OR REPLACE FUNCTION toggle_user_active(user_id UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  is_active BOOLEAN,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    UPDATE users 
    SET is_active = NOT is_active, updated_at = NOW()
    WHERE id = user_id
    RETURNING id, full_name, is_active, updated_at;
END;
$$ LANGUAGE plpgsql;

-- Toggle announcement featured status
CREATE OR REPLACE FUNCTION toggle_announcement_featured(announcement_id UUID)
RETURNS TABLE (
  id UUID,
  title TEXT,
  featured BOOLEAN,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    UPDATE announcements 
    SET featured = NOT featured, updated_at = NOW()
    WHERE id = announcement_id
    RETURNING id, title, featured, updated_at;
END;
$$ LANGUAGE plpgsql;

-- Get dashboard statistics
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE (
  total_users BIGINT,
  total_sermons BIGINT,
  total_missions BIGINT,
  total_messages BIGINT,
  total_remedies BIGINT,
  unread_messages BIGINT,
  published_sermons BIGINT,
  published_missions BIGINT,
  published_remedies BIGINT,
  featured_remedies BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM users WHERE is_active = true),
        (SELECT COUNT(*) FROM sermons),
        (SELECT COUNT(*) FROM medical_missions),
        (SELECT COUNT(*) FROM messages),
        (SELECT COUNT(*) FROM natural_remedies),
        (SELECT COUNT(*) FROM messages WHERE status = 'unread'),
        (SELECT COUNT(*) FROM sermons WHERE status = 'published'),
        (SELECT COUNT(*) FROM medical_missions WHERE status = 'published'),
        (SELECT COUNT(*) FROM natural_remedies WHERE status = 'published'),
        (SELECT COUNT(*) FROM natural_remedies WHERE featured = true);
END;
$$ LANGUAGE plpgsql;

-- Get recent activity
CREATE OR REPLACE FUNCTION get_recent_activity(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  type TEXT,
  action TEXT,
  details TEXT,
  user_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    (
        SELECT 
            s.id,
            'sermon' as type,
            'created' as action,
            s.title as details,
            u.full_name as user_name,
            s.created_at
        FROM sermons s
        JOIN users u ON s.author_id = u.id
        
        UNION ALL
        
        SELECT 
            m.id,
            'mission' as type,
            'created' as action,
            m.title as details,
            u.full_name as user_name,
            m.created_at
        FROM medical_missions m
        JOIN users u ON m.coordinator_id = u.id
        
        UNION ALL
        
        SELECT 
            r.id,
            'remedy' as type,
            'created' as action,
            r.name as details,
            u.full_name as user_name,
            r.created_at
        FROM natural_remedies r
        JOIN users u ON r.author_id = u.id
        
        UNION ALL
        
        SELECT 
            msg.id,
            'message' as type,
            'received' as action,
            msg.subject as details,
            msg.sender_name as user_name,
            msg.created_at
        FROM messages msg
    )
    ORDER BY created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Search across all content
CREATE OR REPLACE FUNCTION search_content(search_term TEXT)
RETURNS TABLE (
  type TEXT,
  id UUID,
  title TEXT,
  content TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    (
        SELECT 
            'sermon' as type,
            s.id,
            s.title,
            s.content,
            '/admin/sermons/edit/' || s.id as url,
            s.created_at
        FROM sermons s
        WHERE s.title ILIKE '%' || search_term || '%' 
           OR s.content ILIKE '%' || search_term || '%'
           
        UNION ALL
        
        SELECT 
            'remedy' as type,
            r.id,
            r.name,
            r.description,
            '/admin/remedies/edit/' || r.id as url,
            r.created_at
        FROM natural_remedies r
        WHERE r.name ILIKE '%' || search_term || '%' 
           OR r.description ILIKE '%' || search_term || '%'
           OR r.conditions ILIKE '%' || search_term || '%'
           
        UNION ALL
        
        SELECT 
            'mission' as type,
            m.id,
            m.title,
            m.description,
            '/admin/missions/edit/' || m.id as url,
            m.created_at
        FROM medical_missions m
        WHERE m.title ILIKE '%' || search_term || '%' 
           OR m.description ILIKE '%' || search_term || '%'
           
        UNION ALL
        
        SELECT 
            'announcement' as type,
            a.id,
            a.title,
            a.content,
            '/admin/announcements/edit/' || a.id as url,
            a.created_at
        FROM announcements a
        WHERE a.title ILIKE '%' || search_term || '%' 
           OR a.content ILIKE '%' || search_term || '%'
    )
    ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql;
