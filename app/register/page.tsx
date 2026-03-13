"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name: name || undefined }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Registration failed.");
      return;
    }
    const signInRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    if (signInRes?.url) {
      router.push(signInRes.url);
    } else {
      router.push("/login?callbackUrl=/dashboard");
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(160deg, #0c0a0f 0%, #1a1520 50%, #0c0a0f 100%)",
    }}>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.75rem",
        marginBottom: "1.5rem",
      }}>
        Create account
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "360px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid var(--accent-dim)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid var(--accent-dim)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid var(--accent-dim)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
        {error && <p style={{ color: "var(--danger)", fontSize: "0.9rem" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            background: "linear-gradient(135deg, var(--accent-dim), var(--accent))",
            color: "#fff",
            border: "none",
            fontWeight: 500,
          }}
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            background: "var(--surface)",
            color: "var(--text)",
            border: "1px solid var(--accent-dim)",
          }}
        >
          Continue with Google
        </button>
      </div>
      <p style={{ marginTop: "1.5rem", color: "var(--muted)" }}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </main>
  );
}
