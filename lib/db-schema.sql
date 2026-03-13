-- Awesome Greetings By Dioame - Turso schema

-- Users (for registration + Google link)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password_hash TEXT,
  google_id TEXT UNIQUE,
  image TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Greeting types / design library
CREATE TABLE IF NOT EXISTS greeting_designs (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  design_type TEXT NOT NULL,
  config_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- User-created greetings (shareable links)
CREATE TABLE IF NOT EXISTS greetings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  design_id TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  sender_name TEXT,
  message TEXT NOT NULL,
  custom_json TEXT,
  share_slug TEXT UNIQUE NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (design_id) REFERENCES greeting_designs(id)
);

CREATE INDEX IF NOT EXISTS idx_greetings_share_slug ON greetings(share_slug);
CREATE INDEX IF NOT EXISTS idx_greetings_expires_at ON greetings(expires_at);
CREATE INDEX IF NOT EXISTS idx_greetings_user_id ON greetings(user_id);
