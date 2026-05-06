import { join } from "path";
import { config } from "dotenv";
import { createClient } from "@libsql/client";
import { syncDefaultGreetingDesigns } from "../lib/sync-default-greeting-designs";

config({ path: join(process.cwd(), ".env.local") });

const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;
const client = createClient({ url, authToken: authToken || undefined });

async function main() {
  await syncDefaultGreetingDesigns(client);
  console.log("Greeting designs and template library (occasions) seeded.");
}

main().catch(console.error).finally(() => process.exit(0));
