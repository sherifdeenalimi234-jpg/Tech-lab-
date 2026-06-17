-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    institution TEXT NOT NULL,
    role TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    flyer_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert a registration
CREATE POLICY "Allow public insert" ON registrations
    FOR INSERT WITH CHECK (true);

-- Policy to allow public read (optional, for admin or public count)
-- For the landing page, we might want to keep it restricted,
-- but for the admin dashboard we'll need access.
-- Usually admin dashboard uses service role or authenticated role.
CREATE POLICY "Allow public read" ON registrations
    FOR SELECT USING (true);

-- Storage bucket setup (this needs to be done in Supabase UI or via API)
-- Bucket name: 'profile-photos'
-- Bucket name: 'flyers'
