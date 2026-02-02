-- TODO: Execute this SQL in your Supabase project SQL Editor
-- Replace placeholder values with your actual Supabase project configuration

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
