import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/turso";
import { nanoid } from "nanoid";

const EXPIRY_DAYS = 3;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "User id not found" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { designId, recipientName, senderName, message } = body;
    if (!designId || !recipientName || !message) {
      return NextResponse.json(
        { error: "designId, recipientName, and message required" },
        { status: 400 }
      );
    }

    const design = await db.execute({
      sql: "SELECT id FROM greeting_designs WHERE id = ?",
      args: [designId],
    });
    if (design.rows.length === 0) {
      return NextResponse.json({ error: "Invalid design" }, { status: 400 });
    }

    const shareSlug = nanoid(12);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXPIRY_DAYS);
    const id = nanoid();

    await db.execute({
      sql: `INSERT INTO greetings (id, user_id, design_id, recipient_name, sender_name, message, share_slug, expires_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        userId,
        designId,
        String(recipientName),
        senderName ?? session.user.name ?? "",
        String(message),
        shareSlug,
        expiresAt.toISOString(),
      ],
    });

    const baseUrl = process.env.NEXTAUTH_URL
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const link = `${baseUrl}/g/${shareSlug}`;

    return NextResponse.json({
      ok: true,
      greetingId: id,
      shareSlug,
      link,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create greeting" }, { status: 500 });
  }
}
