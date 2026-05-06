import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getDb } from "./turso";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

const googleClientId = (process.env.GOOGLE_CLIENT_ID ?? "").trim();
const googleClientSecret = (process.env.GOOGLE_CLIENT_SECRET ?? "").trim();
if (process.env.NODE_ENV === "development" && (!googleClientId || !googleClientSecret)) {
  console.warn(
    "[NextAuth] Google sign-in will fail until you set in .env.local:\n" +
      "  GOOGLE_CLIENT_ID=your-client-id\n" +
      "  GOOGLE_CLIENT_SECRET=your-client-secret\n" +
      "Get them from https://console.cloud.google.com/apis/credentials\n" +
      "Redirect URI must be: http://localhost:3000/api/auth/callback/google"
  );
}

export const authOptions = {
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const r = await getDb().execute({
          sql: "SELECT id, email, password_hash FROM users WHERE email = ?",
          args: [credentials.email],
        });
        const row = r.rows[0];
        if (!row || typeof row.password_hash !== "string") return null;
        const ok = await bcrypt.compare(credentials.password, row.password_hash);
        if (!ok) return null;
        return {
          id: row.id as string,
          email: row.email as string,
          name: null,
          image: null,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google" && user.email) {
          const existing = await getDb().execute({
            sql: "SELECT id FROM users WHERE email = ? OR google_id = ?",
            args: [user.email, user.id ?? ""],
          });
          if (existing.rows.length === 0) {
            const id = nanoid();
            await getDb().execute({
              sql: "INSERT INTO users (id, email, name, google_id, image) VALUES (?, ?, ?, ?, ?)",
              args: [id, user.email, user.name ?? "", user.id ?? "", user.image ?? null],
            });
          }
        }
        return true;
      } catch (e) {
        console.error("[NextAuth] signIn callback error:", e);
        throw e;
      }
    },
    async jwt({ token, user }) {
      try {
        if (user?.email) {
          const r = await getDb().execute({
            sql: "SELECT id FROM users WHERE email = ?",
            args: [user.email],
          });
          if (r.rows[0]) token.id = r.rows[0].id as string;
          else token.id = user.id;
          token.email = user.email;
        }
        return token;
      } catch (e) {
        console.error("[NextAuth] jwt callback error:", e);
        if (user?.id) token.id = user.id;
        return token;
      }
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
} as NextAuthOptions;

declare module "next-auth" {
  interface User {
    id?: string;
  }
  interface Session {
    user: User & { id?: string };
  }
}
