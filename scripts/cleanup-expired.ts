import { join } from "path";
import { config } from "dotenv";
import { createClient } from "@libsql/client";

config({ path: join(process.cwd(), ".env.local") });

const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;
const client = createClient({ url, authToken: authToken || undefined });

async function main() {
  const result = await client.execute({
    sql: "DELETE FROM greetings WHERE expires_at <= datetime('now')",
    args: [],
  });
  console.log("Deleted expired greetings. Rows affected:", result.rowsAffected);
}

main().catch(console.error).finally(() => process.exit(0));
