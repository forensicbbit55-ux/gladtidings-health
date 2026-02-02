-- TODO: Execute this SQL in your Supabase project SQL Editor
-- Replace placeholder values with your actual Supabase project configuration

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
('media', 'media', true),
('remedy-images', 'remedy-images', true),
('sermon-images', 'sermon-images', true),
('mission-images', 'mission-images', true),
('user-avatars', 'user-avatars', false)
ON CONFLICT (id) DO NOTHING;

-- TODO: Enable Row Level Security (RLS) after environment variables are configured
-- The following policies will be activated once environment variables are set:

-- Storage policies (placeholders - to be activated after configuration)
/*
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
*/
