import { notFound } from "next/navigation";
import { db } from "@/lib/turso";
import { GreetingView } from "./GreetingView";

export const dynamic = "force-dynamic";

export default async function GreetingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = await db.execute({
    sql: `SELECT g.id, g.recipient_name, g.sender_name, g.message, g.expires_at, g.design_id,
          d.slug AS design_slug, d.design_type, d.config_json
          FROM greetings g
          JOIN greeting_designs d ON g.design_id = d.id
          WHERE g.share_slug = ?`,
    args: [slug],
  });

  if (r.rows.length === 0) {
    notFound();
  }

  const row = r.rows[0];
  const expiresAt = new Date(String(row.expires_at));
  if (expiresAt <= new Date()) {
    await db.execute({ sql: "DELETE FROM greetings WHERE share_slug = ?", args: [slug] });
    notFound();
  }

  const greeting = {
    recipientName: String(row.recipient_name),
    senderName: row.sender_name ? String(row.sender_name) : null,
    message: String(row.message),
    design: {
      slug: String(row.design_slug),
      type: String(row.design_type),
      config: row.config_json ? JSON.parse(String(row.config_json)) : {},
    },
  };

  return <GreetingView greeting={greeting} />;
}
