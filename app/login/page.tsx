"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const OAUTH_ERRORS: Record<string, string> = {
  Configuration: "Google sign-in is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local and set the redirect URI in Google Cloud Console.",
  configuration: "Server configuration error. Set NEXTAUTH_URL and NEXTAUTH_SECRET in .env.local.",
  OAuthSignin: "Could not start Google sign-in. Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set correctly in .env.local (no quotes, no extra spaces). Restart the dev server after changing .env.local.",
  AccessDenied: "Access denied.",
  accessdenied: "You do not have permission to sign in.",
  Verification: "Verification failed. The link may have expired.",
  verification: "The sign-in link is no longer valid.",
  OAuthAccountNotLinked: "This email is already registered with a password. Sign in with email/password, or use the same Google account you used originally.",
  OAuthCreateAccount: "Could not create your account. Try again.",
  OAuthCallback: "Error from Google. Check that the redirect URI in Google Cloud Console is exactly: " + (typeof window !== "undefined" ? `${window.location.origin}/api/auth/callback/google` : "http://localhost:3000/api/auth/callback/google"),
  Callback: "Server error during sign-in. Check the terminal for errors. Ensure the database is reachable and NEXTAUTH_SECRET is set in .env.local.",
  Default: "Something went wrong with Google sign-in.",
};

// NextAuth mistakenly sets error=providerId when redirecting from /api/auth/signin/google (no real error)
const PROVIDER_IDS = ["google", "credentials"];

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const rawError = searchParams.get("error");
  const oauthError = rawError && !PROVIDER_IDS.includes(rawError.toLowerCase()) ? rawError : null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    if (res?.url) window.location.href = res.url;
  }

  return (
    <>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.75rem",
        marginBottom: "1.5rem",
      }}>
        Sign in
      </h1>
      <form
        onSubmit={handleCredentials}
        style={{
          width: "100%",
          maxWidth: "360px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
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
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid var(--accent-dim)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
        {(error || oauthError) && (
          <p style={{ color: "var(--danger)", fontSize: "0.9rem" }}>
            {error || OAUTH_ERRORS[oauthError ?? ""] || OAUTH_ERRORS[oauthError?.toLowerCase() ?? ""] || (oauthError ? `Sign-in error: ${oauthError}` : OAUTH_ERRORS.Default)}
          </p>
        )}
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
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>or</p>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl })}
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
        No account? <Link href="/register">Register</Link>
      </p>
    </>
  );
}

export default function LoginPage() {
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
      <Suspense fallback={<p style={{ color: "var(--muted)" }}>Loading…</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
