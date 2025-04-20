-- Enable RLS (Row Level Security)
ALTER TABLE doomscroll_logs ENABLE ROW LEVEL SECURITY;

-- Create a profiles table that references auth.users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create a function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $
BEGIN
  INSERT INTO profiles (id, username, display_name)
  VALUES (new.id, new.email, split_part(new.email, '@', 1));
  RETURN new;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Create a VIEW to join profiles with user auth data
CREATE VIEW user_details AS
  SELECT 
    p.id,
    p.username,
    p.display_name,
    p.avatar_url,
    p.bio,
    u.email,
    u.created_at,
    p.updated_at
  FROM 
    profiles p
  JOIN 
    auth.users u ON p.id = u.id;

-- Create or replace Policy for doomscroll_logs
CREATE POLICY "Users can only access their own events"
  ON doomscroll_logs
  FOR ALL
  USING (user_uuid::text = auth.uid()::text);

-- Create policy for profiles
CREATE POLICY "Users can only update their own profile"
  ON profiles
  FOR ALL
  USING (id = auth.uid());

-- Create policy for public reading of profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  USING (true);