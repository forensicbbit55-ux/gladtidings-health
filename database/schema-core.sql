-- TODO: Execute this SQL in your Supabase project SQL Editor
-- Replace placeholder values with your actual Supabase project configuration

-- Create custom types for user roles and content status
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
CREATE TRIGGER update_natural_remedies_updated_at BEFORE UPDATE ON natural_remedies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- TODO: Enable Row Level Security (RLS) after environment variables are configured
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE natural_remedies ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE remedy_images ENABLE ROW LEVEL SECURITY;
