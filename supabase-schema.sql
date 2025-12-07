-- DIGITIHA Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create drawings table
CREATE TABLE IF NOT EXISTS drawings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  digit INTEGER NOT NULL CHECK (digit >= 0 AND digit <= 9),
  image_data JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_drawings_username ON drawings(username);
CREATE INDEX IF NOT EXISTS idx_drawings_digit ON drawings(digit);
CREATE INDEX IF NOT EXISTS idx_drawings_timestamp ON drawings(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_users_count ON users(count DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE drawings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (using anon key)
CREATE POLICY "Enable read access for all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON users
  FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON drawings
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON drawings
  FOR INSERT WITH CHECK (true);

-- Optional: Create a view for leaderboard (pre-sorted)
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  username,
  count,
  joined_at,
  ROW_NUMBER() OVER (ORDER BY count DESC) as rank
FROM users
ORDER BY count DESC;

-- Optional: Create a view for digit statistics
CREATE OR REPLACE VIEW digit_stats AS
SELECT 
  digit,
  COUNT(*) as total_drawings,
  COUNT(DISTINCT username) as unique_contributors
FROM drawings
GROUP BY digit
ORDER BY digit;
