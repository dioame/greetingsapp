import { NextResponse } from "next/server";
import { getDb } from "@/lib/turso";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const r = await getDb().execute({
      sql: "DELETE FROM greetings WHERE expires_at <= datetime('now')",
      args: [],
    });
    return NextResponse.json({ deleted: r.rowsAffected });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
