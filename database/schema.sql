-- Create custom types for user roles
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE remedy_category AS ENUM (
    'herbal_tea', 
    'herbal_drink', 
    'natural_antibiotic', 
    'essential_oil', 
    'topical_remedy', 
    'respiratory', 
    'digestive_health'
);

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role user_role DEFAULT 'viewer',
    avatar_url TEXT,
    phone TEXT,
    bio TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Natural Remedies Categories
CREATE TABLE IF NOT EXISTS remedy_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name remedy_category UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Natural Remedies
CREATE TABLE IF NOT EXISTS natural_remedies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    category remedy_category NOT NULL,
    conditions TEXT,
    description TEXT,
    ingredients TEXT,
    preparation TEXT,
    usage TEXT,
    dosage TEXT,
    precautions TEXT,
    status content_status DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    author_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Remedy Images
CREATE TABLE IF NOT EXISTS remedy_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    remedy_id UUID REFERENCES natural_remedies(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    is_primary BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sermons/Articles
CREATE TABLE IF NOT EXISTS sermons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    excerpt TEXT,
    author_id UUID REFERENCES users(id),
    category TEXT,
    tags TEXT[],
    read_time INTEGER, -- in minutes
    status content_status DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medical Missions
CREATE TABLE IF NOT EXISTS medical_missions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    coordinator_id UUID REFERENCES users(id),
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    status content_status DEFAULT 'draft',
    requirements TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media Library
CREATE TABLE IF NOT EXISTS media (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'image', 'video', 'pdf', 'document'
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    alt_text TEXT,
    description TEXT,
    folder TEXT,
    tags TEXT[],
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT, -- 'prayer_request', 'volunteer', 'testimony', 'donation', 'general_inquiry', 'partnership', 'counseling'
    status TEXT DEFAULT 'unread', -- 'read', 'unread'
    priority TEXT DEFAULT 'medium', -- 'high', 'medium', 'low'
    replied BOOLEAN DEFAULT false,
    reply_content TEXT,
    replied_by UUID REFERENCES users(id),
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT, -- 'general', 'service_schedule', 'event', 'program', 'training', 'sermon_series'
    priority TEXT DEFAULT 'medium', -- 'high', 'medium', 'low'
    status content_status DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    author_id UUID REFERENCES users(id),
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default remedy categories
INSERT INTO remedy_categories (name, display_name, description) VALUES
('herbal_tea', 'Herbal Tea', 'Tea-based natural remedies'),
('herbal_drink', 'Herbal Drink', 'Non-tea herbal beverages'),
('natural_antibiotic', 'Natural Antibiotic', 'Natural antimicrobial remedies'),
('essential_oil', 'Essential Oil', 'Oil-based treatments'),
('topical_remedy', 'Topical Remedy', 'External applications'),
('respiratory', 'Respiratory', 'Breathing-related treatments'),
('digestive_health', 'Digestive Health', 'Digestive system remedies')
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_natural_remedies_category ON natural_remedies(category);
CREATE INDEX IF NOT EXISTS idx_natural_remedies_status ON natural_remedies(status);
CREATE INDEX IF NOT EXISTS idx_natural_remedies_featured ON natural_remedies(featured);
CREATE INDEX IF NOT EXISTS idx_sermons_status ON sermons(status);
CREATE INDEX IF NOT EXISTS idx_sermons_author ON sermons(author_id);
CREATE INDEX IF NOT EXISTS idx_medical_missions_date ON medical_missions(date);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements(status);
CREATE INDEX IF NOT EXISTS idx_announcements_featured ON announcements(featured);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_remedy_categories_updated_at BEFORE UPDATE ON remedy_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_natural_remedies_updated_at BEFORE UPDATE ON natural_remedies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sermons_updated_at BEFORE UPDATE ON sermons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medical_missions_updated_at BEFORE UPDATE ON medical_missions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE natural_remedies ENABLE ROW LEVEL SECURITY;
ALTER TABLE remedy_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can only see their own profile (except admins)
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Only admins can insert/update/delete users
CREATE POLICY "Admins can manage users" ON users FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Natural Remedies - Public can read published, authenticated can read all, admins can manage
CREATE POLICY "Public can read published remedies" ON natural_remedies FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated users can read all remedies" ON natural_remedies FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage remedies" ON natural_remedies FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);

-- Similar policies for other tables
CREATE POLICY "Public can read published sermons" ON sermons FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated users can read all sermons" ON sermons FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage sermons" ON sermons FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);

CREATE POLICY "Public can read published missions" ON medical_missions FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated users can read all missions" ON medical_missions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage missions" ON medical_missions FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);

CREATE POLICY "Admins can manage media" ON media FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);

CREATE POLICY "Admins can manage messages" ON messages FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);

CREATE POLICY "Public can read published announcements" ON announcements FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated users can read all announcements" ON announcements FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage announcements" ON announcements FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);

CREATE POLICY "Admins can manage remedy images" ON remedy_images FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
);
