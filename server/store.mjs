import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
export function openStore(filename = process.env.BLOG_DB_PATH || resolve('data/blog.sqlite')) {
  mkdirSync(dirname(filename), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, data TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, csrf TEXT NOT NULL, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS attempts (ip TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);`);
  db.exec(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, username TEXT UNIQUE COLLATE NOCASE NOT NULL,
    email TEXT UNIQUE COLLATE NOCASE NOT NULL, role TEXT NOT NULL CHECK(role IN ('admin','editor')),
    active INTEGER NOT NULL DEFAULT 1, passwordHash TEXT NOT NULL, version TEXT NOT NULL
  );`);
  if (!db.prepare('PRAGMA table_info(sessions)').all().some(column => column.name === 'userId')) {
    db.exec('ALTER TABLE sessions ADD COLUMN userId TEXT; DELETE FROM sessions;');
  }
  return db;
}
