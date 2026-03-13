import { readFileSync } from "fs";
import { join } from "path";
import { config } from "dotenv";
import { createClient } from "@libsql/client";

// Load .env.local so Turso URL/token are available (Next.js doesn't run these scripts)
config({ path: join(process.cwd(), ".env.local") });

const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

if (url.startsWith("libsql://") || url.startsWith("https://")) {
  console.log("Connecting to Turso...");
} else {
  console.warn("Using local DB (file:...). Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env.local for Turso.");
}

const client = createClient({
  url,
  authToken: authToken || undefined,
});

const schemaPath = join(process.cwd(), "lib", "db-schema.sql");
const schema = readFileSync(schemaPath, "utf-8");

function stripLeadingComments(s: string): string {
  return s
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("--"))
    .join("\n")
    .trim();
}

async function main() {
  const statements = schema
    .split(";")
    .map((s) => stripLeadingComments(s.trim()))
    .filter(Boolean);
  for (const stmt of statements) {
    await client.execute(stmt + ";");
    console.log("Executed:", stmt.slice(0, 60) + "...");
  }
  console.log("Schema applied.");
}

main().catch(console.error).finally(() => process.exit(0));
