import Database from "better-sqlite3";

// Create or open database file
const db = new Database('todo.db');

// Initialize schema (runs every time, safe enough for now)
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT,
    deleted_at TEXT
  );
`);

export default db;
