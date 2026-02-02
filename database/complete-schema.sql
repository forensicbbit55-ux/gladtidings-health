-- Medical Missionary Website Database Schema
-- Copy and paste this entire script into your Supabase SQL Editor

-- ========================================
-- 1. CREATE ENUM TYPES
-- ========================================

-- User roles enum
CREATE TYPE user_role AS ENUM ('admin', 'editor');

-- ========================================
-- 2. CREATE TABLES
-- ========================================

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    role user_role DEFAULT 'editor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conditions table
CREATE TABLE IF NOT EXISTS conditions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Remedies table
CREATE TABLE IF NOT EXISTS remedies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    ingredients TEXT,
    preparation TEXT,
    usage TEXT,
    dosage TEXT,
    precautions TEXT,
    image_url TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Remedy Conditions junction table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS remedy_conditions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    remedy_id UUID REFERENCES remedies(id) ON DELETE CASCADE,
    condition_id UUID REFERENCES conditions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(remedy_id, condition_id)
);

-- ========================================
-- 3. CREATE TRIGGER FOR UPDATED_AT
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for remedies table
CREATE TRIGGER update_remedies_updated_at 
    BEFORE UPDATE ON remedies 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE remedies ENABLE ROW LEVEL SECURITY;
ALTER TABLE remedy_conditions ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 5. CREATE RLS POLICIES
-- ========================================

-- Profiles policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles" ON profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can insert profiles (for user creation)
CREATE POLICY "Admins can insert profiles" ON profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can delete profiles
CREATE POLICY "Admins can delete profiles" ON profiles
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Conditions policies
-- Public users can view all conditions
CREATE POLICY "Public can view conditions" ON conditions
    FOR SELECT USING (true);

-- Admins can insert conditions
CREATE POLICY "Admins can insert conditions" ON conditions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can update conditions
CREATE POLICY "Admins can update conditions" ON conditions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can delete conditions
CREATE POLICY "Admins can delete conditions" ON conditions
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Remedies policies
-- Public users can only view published remedies
CREATE POLICY "Public can view published remedies" ON remedies
    FOR SELECT USING (is_published = true);

-- Admins can view all remedies
CREATE POLICY "Admins can view all remedies" ON remedies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Editors can view all remedies
CREATE POLICY "Editors can view all remedies" ON remedies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'editor'
        )
    );

-- Admins can insert remedies
CREATE POLICY "Admins can insert remedies" ON remedies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Editors can insert remedies
CREATE POLICY "Editors can insert remedies" ON remedies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'editor'
        )
    );

-- Admins can update remedies
CREATE POLICY "Admins can update remedies" ON remedies
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Editors can update remedies
CREATE POLICY "Editors can update remedies" ON remedies
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'editor'
        )
    );

-- Admins can delete remedies
CREATE POLICY "Admins can delete remedies" ON remedies
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Remedy Conditions policies
-- Public users can view remedy_conditions for published remedies
CREATE POLICY "Public can view remedy conditions for published remedies" ON remedy_conditions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM remedies 
            WHERE remedies.id = remedy_conditions.remedy_id 
            AND remedies.is_published = true
        )
    );

-- Admins can view all remedy_conditions
CREATE POLICY "Admins can view all remedy conditions" ON remedy_conditions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Editors can view all remedy_conditions
CREATE POLICY "Editors can view all remedy conditions" ON remedy_conditions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'editor'
        )
    );

-- Admins can insert remedy_conditions
CREATE POLICY "Admins can insert remedy conditions" ON remedy_conditions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Editors can insert remedy_conditions
CREATE POLICY "Editors can insert remedy conditions" ON remedy_conditions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'editor'
        )
    );

-- Admins can update remedy_conditions
CREATE POLICY "Admins can update remedy conditions" ON remedy_conditions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Editors can update remedy_conditions
CREATE POLICY "Editors can update remedy conditions" ON remedy_conditions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'editor'
        )
    );

-- Admins can delete remedy_conditions
CREATE POLICY "Admins can delete remedy conditions" ON remedy_conditions
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ========================================
-- 6. CREATE HELPER FUNCTIONS
-- ========================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER -- TODO: Consider using service role key for admin operations
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$;

-- Function to check if user is editor or admin
CREATE OR REPLACE FUNCTION is_editor_or_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER -- TODO: Consider using service role key for admin operations
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role IN ('editor', 'admin')
    );
END;
$$;

-- ========================================
-- 7. INSERT SAMPLE DATA (Optional)
-- ========================================

-- Insert some common conditions
INSERT INTO conditions (name) VALUES
('Headache'),
('Fever'),
('Cough'),
('Cold'),
('Digestive Issues'),
('Skin Problems'),
('Stress'),
('Insomnia')
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- 8. CREATE INDEXES FOR PERFORMANCE
-- ========================================

-- Indexes for remedies table
CREATE INDEX IF NOT EXISTS idx_remedies_is_published ON remedies(is_published);
CREATE INDEX IF NOT EXISTS idx_remedies_category ON remedies(category);
CREATE INDEX IF NOT EXISTS idx_remedies_created_at ON remedies(created_at);

-- Indexes for remedy_conditions table
CREATE INDEX IF NOT EXISTS idx_remedy_conditions_remedy_id ON remedy_conditions(remedy_id);
CREATE INDEX IF NOT EXISTS idx_remedy_conditions_condition_id ON remedy_conditions(condition_id);

-- Indexes for profiles table
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- ========================================
-- 9. COMPLETION MESSAGE
-- ========================================

-- Database schema created successfully!
-- Tables: profiles, conditions, remedies, remedy_conditions
-- RLS enabled with appropriate policies
-- Admin access controlled by profiles.role field
-- Public users can only see published remedies

-- TODO: Admin Service Operations
-- For admin-only operations that bypass RLS, use the service role key:
-- - User management operations
-- - Bulk data operations
-- - System maintenance tasks
