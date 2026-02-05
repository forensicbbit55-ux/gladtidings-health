-- Create PostgreSQL tables for Glad Tidings Medical Missionary Website
-- Safe table creation with IF NOT EXISTS to prevent data loss

-- Create admins table with proper authentication fields
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- Create remedies table
CREATE TABLE IF NOT EXISTS remedies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    usage TEXT,
    image_url TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);

-- Insert sample data for testing
INSERT INTO categories (name) VALUES 
('Herbal Remedies'),
('Natural Therapies'),
('Dietary Supplements'),
('Essential Oils')
ON CONFLICT DO NOTHING;

INSERT INTO admins (email) VALUES 
('admin@gladtidings.com')
ON CONFLICT DO NOTHING;

-- Show created tables
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('admins', 'categories', 'remedies')
ORDER BY table_name;
