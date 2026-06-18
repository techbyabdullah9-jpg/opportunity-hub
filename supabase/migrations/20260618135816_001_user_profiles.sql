-- Create user_profiles table to store additional user data
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  phone TEXT,
  country TEXT,
  city TEXT,
  date_of_birth DATE,
  role TEXT NOT NULL CHECK (role IN ('student', 'instructor')),
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create instructor_profiles table for instructor-specific data
CREATE TABLE IF NOT EXISTS instructor_profiles (
  id UUID PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  display_name TEXT,
  headline TEXT,
  bio TEXT,
  years_of_experience INTEGER,
  teaching_categories TEXT[],
  languages_spoken TEXT[],
  linkedin_url TEXT,
  website_url TEXT,
  rating NUMERIC(2,1) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0
);

-- Create student_profiles table for student-specific data
CREATE TABLE IF NOT EXISTS student_profiles (
  id UUID PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  learning_interests TEXT[],
  preferred_language TEXT
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "select_own_profile" ON user_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE POLICY "insert_own_profile" ON user_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "update_own_profile" ON user_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- RLS Policies for instructor_profiles
CREATE POLICY "select_own_instructor_profile" ON instructor_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE POLICY "insert_own_instructor_profile" ON instructor_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "update_own_instructor_profile" ON instructor_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- RLS Policies for student_profiles
CREATE POLICY "select_own_student_profile" ON student_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE POLICY "insert_own_student_profile" ON student_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "update_own_student_profile" ON student_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Allow public read of instructor profiles for browsing
CREATE POLICY "select_instructor_profiles_public" ON instructor_profiles FOR SELECT
  TO authenticated USING (true);

-- Allow public read of user_profiles for instructors (to show in listings)
CREATE POLICY "select_instructor_user_profiles_public" ON user_profiles FOR SELECT
  TO authenticated USING (role = 'instructor');

-- Create index for faster username lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
