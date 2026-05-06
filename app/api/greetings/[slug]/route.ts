import { NextResponse } from "next/server";
import { getDb } from "@/lib/turso";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const r = await getDb().execute({
    sql: `SELECT g.id, g.recipient_name, g.sender_name, g.message, g.expires_at, g.design_id,
          d.slug AS design_slug, d.design_type, d.config_json
          FROM greetings g
          JOIN greeting_designs d ON g.design_id = d.id
          WHERE g.share_slug = ?`,
    args: [slug],
  });

  if (r.rows.length === 0) {
    return NextResponse.json({ error: "Greeting not found or expired" }, { status: 404 });
  }

  const row = r.rows[0];
  const expiresAt = new Date(String(row.expires_at));
  if (expiresAt <= new Date()) {
    return NextResponse.json({ error: "Greeting expired" }, { status: 410 });
  }

  return NextResponse.json({
    id: row.id,
    recipientName: row.recipient_name,
    senderName: row.sender_name,
    message: row.message,
    expiresAt: row.expires_at,
    design: {
      id: row.design_id,
      slug: row.design_slug,
      type: row.design_type,
      config: row.config_json ? JSON.parse(String(row.config_json)) : {},
    },
  });
}
