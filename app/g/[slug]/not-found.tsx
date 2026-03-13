import Link from "next/link";

export default function GreetingNotFound() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(160deg, #0c0a0f 0%, #1a1520 100%)",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.75rem",
        marginBottom: "0.5rem",
        color: "var(--text)",
      }}>
        This greeting is no longer available
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem", textAlign: "center" }}>
        The link may have expired (greetings expire after 3 days) or the link is invalid.
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          background: "linear-gradient(135deg, var(--accent-dim), var(--accent))",
          color: "#fff",
        }}
      >
        Create your own greeting
      </Link>
    </main>
  );
}
