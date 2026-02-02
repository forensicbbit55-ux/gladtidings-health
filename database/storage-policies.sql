-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
('media', 'media', true),
('remedy-images', 'remedy-images', true),
('sermon-images', 'sermon-images', true),
('mission-images', 'mission-images', true),
('user-avatars', 'user-avatars', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
-- Media bucket - authenticated users can upload, admins can manage
CREATE POLICY "Authenticated users can upload media" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'media' AND auth.role() = 'authenticated'
);

CREATE POLICY "Admins can manage all media" ON storage.objects FOR ALL USING (
    bucket_id = 'media' AND 
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);

-- Remedy images bucket - authenticated users can upload, admins can manage
CREATE POLICY "Authenticated users can upload remedy images" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'remedy-images' AND auth.role() = 'authenticated'
);

CREATE POLICY "Admins can manage remedy images" ON storage.objects FOR ALL USING (
    bucket_id = 'remedy-images' AND 
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);

-- Sermon images bucket - authenticated users can upload, admins can manage
CREATE POLICY "Authenticated users can upload sermon images" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'sermon-images' AND auth.role() = 'authenticated'
);

CREATE POLICY "Admins can manage sermon images" ON storage.objects FOR ALL USING (
    bucket_id = 'sermon-images' AND 
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);

-- Mission images bucket - authenticated users can upload, admins can manage
CREATE POLICY "Authenticated users can upload mission images" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'mission-images' AND auth.role() = 'authenticated'
);

CREATE POLICY "Admins can manage mission images" ON storage.objects FOR ALL USING (
    bucket_id = 'mission-images' AND 
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);

-- User avatars bucket - users can upload their own avatar, admins can manage
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'user-avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view own avatar" ON storage.objects FOR SELECT USING (
    bucket_id = 'user-avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can manage user avatars" ON storage.objects FOR ALL USING (
    bucket_id = 'user-avatars' AND 
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);
