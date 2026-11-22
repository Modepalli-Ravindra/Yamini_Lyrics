-- schema.sql

-- 1. Deities / Categories (Folders)
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_telugu TEXT NOT NULL,
  name_english TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT DEFAULT '🪔',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Devotional Songs
CREATE TABLE IF NOT EXISTS songs (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL,
  title_telugu TEXT NOT NULL,
  title_roman TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  lyrics_telugu TEXT NOT NULL,
  lyrics_roman TEXT NOT NULL,
  tags TEXT,
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 3. Admin Credentials & Settings
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Indexes for lightning fast Edge search
CREATE INDEX IF NOT EXISTS idx_songs_category ON songs(category_id);
CREATE INDEX IF NOT EXISTS idx_songs_slug ON songs(slug);
