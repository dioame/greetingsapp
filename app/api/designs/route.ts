import { NextResponse } from "next/server";
import { db } from "@/lib/turso";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
  const r = await db.execute({
    sql: "SELECT id, slug, name, description, design_type, config_json FROM greeting_designs ORDER BY name",
    args: [],
  });
  const designs = r.rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    designType: row.design_type,
    config: row.config_json ? JSON.parse(String(row.config_json)) : {},
  }));
  return NextResponse.json(designs);
  } catch {
    return NextResponse.json([]);
  }
}
