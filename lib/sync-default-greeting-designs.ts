import type { Client } from "@libsql/client";
import { DEFAULT_GREETING_DESIGNS } from "./default-greeting-designs";

/** Upserts shipped templates in one transaction so the catalog stays consistent */
export async function syncDefaultGreetingDesigns(database: Client): Promise<void> {
  const stmts = DEFAULT_GREETING_DESIGNS.map((d) => ({
    sql: `INSERT OR REPLACE INTO greeting_designs (id, slug, name, description, design_type, config_json)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [d.id, d.slug, d.name, d.description, d.design_type, d.config_json],
  }));
  await database.batch(stmts, "write");
}
