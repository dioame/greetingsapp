import { NextResponse } from "next/server";
import { DEFAULT_GREETING_DESIGNS } from "@/lib/default-greeting-designs";
import { getDb } from "@/lib/turso";
import { syncDefaultGreetingDesigns } from "@/lib/sync-default-greeting-designs";

export const dynamic = "force-dynamic";

function parseConfig(raw: unknown): Record<string, unknown> {
  if (raw == null || raw === "") return {};
  try {
    return JSON.parse(String(raw)) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export async function GET() {
  const db = getDb();

  try {
    await syncDefaultGreetingDesigns(db);
  } catch (e) {
    console.error("[api/designs] syncDefaultGreetingDesigns failed:", e);
  }

  try {
    const r = await db.execute({
      sql: "SELECT id, slug, name, description, design_type, config_json FROM greeting_designs ORDER BY name",
      args: [],
    });

    const designs = r.rows.map((row) => ({
      id: String(row.id),
      slug: String(row.slug),
      name: String(row.name),
      description: String(row.description ?? ""),
      designType: String(row.design_type),
      config: parseConfig(row.config_json),
    }));

    const ids = new Set(designs.map((d) => d.id));
    for (const def of DEFAULT_GREETING_DESIGNS) {
      if (!ids.has(def.id)) {
        console.warn("[api/designs] row missing after sync, merging from defaults:", def.slug);
        designs.push({
          id: def.id,
          slug: def.slug,
          name: def.name,
          description: def.description,
          designType: def.design_type,
          config: parseConfig(def.config_json),
        });
      }
    }

    designs.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(designs, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (e) {
    console.error("[api/designs] SELECT failed:", e);
    return NextResponse.json([]);
  }
}
