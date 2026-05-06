import { createClient, type Client } from "@libsql/client";

/**
 * Lazy LibSQL client so `TURSO_DATABASE_URL` is read after Next loads `.env.local`.
 * Recreates the client if the URL changes (e.g. dev vs deploy).
 */
let _db: Client | undefined;
let _cachedUrl: string | undefined;

export function getDb(): Client {
  const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
  const authToken = process.env.TURSO_AUTH_TOKEN || undefined;
  if (!_db || _cachedUrl !== url) {
    _cachedUrl = url;
    _db = createClient({ url, authToken });
  }
  return _db;
}
