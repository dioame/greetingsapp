import { createClient } from "@libsql/client";

// Turso (libSQL): set TURSO_DATABASE_URL + TURSO_AUTH_TOKEN in .env.local
// Otherwise falls back to local SQLite file for development
const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

export const db = createClient({
  url,
  authToken: authToken || undefined,
});
