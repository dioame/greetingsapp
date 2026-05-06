import { NextResponse } from "next/server";
import { getDb } from "@/lib/turso";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }
    const existing = await getDb().execute({
      sql: "SELECT id FROM users WHERE email = ?",
      args: [email],
    });
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }
    const hash = await bcrypt.hash(password, 10);
    const id = nanoid();
    await getDb().execute({
      sql: "INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)",
      args: [id, email, name ?? null, hash],
    });
    return NextResponse.json({ ok: true, userId: id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
