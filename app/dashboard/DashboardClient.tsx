"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GreetingView } from "@/app/g/[slug]/GreetingView";

type Design = {
  id: string;
  slug: string;
  name: string;
  description: string;
  designType: string;
  config?: Record<string, unknown>;
};

export function DashboardClient() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [designId, setDesignId] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState<{ link: string; expiresAt: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/designs")
      .then((r) => r.json())
      .then((data) => setDesigns(Array.isArray(data) ? data : []))
      .catch(() => setDesigns([]));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setCreated(null);
    try {
      const res = await fetch("/api/greetings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designId,
          recipientName,
          senderName: senderName || undefined,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setCreated({ link: data.link, expiresAt: data.expiresAt });
      setRecipientName("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function copyLink() {
    if (created?.link) {
      navigator.clipboard.writeText(created.link);
    }
  }

  const selectedDesign = designs.find((d) => d.id === designId);
  const previewGreeting = selectedDesign
    ? {
        recipientName: recipientName || "Recipient",
        senderName: senderName || null,
        message: message || "Your message will appear here.",
        design: {
          slug: selectedDesign.slug,
          type: selectedDesign.designType,
          config: selectedDesign.config ?? {},
        },
      }
    : null;

  return (
    <main style={{
      minHeight: "100vh",
      padding: "2rem",
      background: "linear-gradient(160deg, #0c0a0f 0%, #1a1520 50%, #0c0a0f 100%)",
    }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem" }}>
          Awesome Greetings By Dioame
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            background: "var(--surface)",
            color: "var(--muted)",
            border: "1px solid var(--accent-dim)",
          }}
        >
          Sign out
        </button>
      </header>

      <div style={{
        display: "flex",
        gap: "2rem",
        alignItems: "stretch",
        flexWrap: "wrap",
        minHeight: "calc(100vh - 6rem)",
      }}>
        <section style={{ flex: "0 0 auto", minWidth: "280px", maxWidth: "480px" }}>
          <h2 style={{ marginBottom: "1.5rem", fontWeight: 500 }}>Create a greeting</h2>

          <form onSubmit={handleCreate} style={{
        maxWidth: "480px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
        <label>
          <span style={{ display: "block", marginBottom: "0.25rem", color: "var(--muted)" }}>Design</span>
          {designs.length === 0 && (
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: "0.5rem", lineHeight: 1.45 }}>
              No templates in your database yet. In the project folder run{" "}
              <code style={{ fontSize: "0.78rem", color: "var(--text)" }}>npm run db:seed</code>{" "}
              (uses <code style={{ fontSize: "0.78rem", color: "var(--text)" }}>.env.local</code>), then refresh this page.
            </p>
          )}
          <select
            value={designId}
            onChange={(e) => setDesignId(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              border: "1px solid var(--accent-dim)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          >
            <option value="">Choose a design</option>
            {designs.map((d) => (
              <option key={d.id} value={d.id}>{d.name} — {d.description}</option>
            ))}
          </select>
        </label>
        <label>
          <span style={{ display: "block", marginBottom: "0.25rem", color: "var(--muted)" }}>Recipient name</span>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="e.g. Maria"
            required
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              border: "1px solid var(--accent-dim)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          />
        </label>
        <label>
          <span style={{ display: "block", marginBottom: "0.25rem", color: "var(--muted)" }}>Your name (optional)</span>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="e.g. John"
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              border: "1px solid var(--accent-dim)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          />
        </label>
        <label>
          <span style={{ display: "block", marginBottom: "0.25rem", color: "var(--muted)" }}>Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your greeting..."
            required
            rows={4}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              border: "1px solid var(--accent-dim)",
              background: "var(--surface)",
              color: "var(--text)",
              resize: "vertical",
            }}
          />
        </label>
        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            background: "linear-gradient(135deg, var(--accent-dim), var(--accent))",
            color: "#fff",
            border: "none",
            fontWeight: 500,
          }}
        >
          {loading ? "Creating…" : "Create & get link"}
        </button>
      </form>

          {created && (
        <section style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background: "var(--surface)",
          borderRadius: "12px",
          border: "1px solid var(--accent-dim)",
          maxWidth: "560px",
        }}>
          <p style={{ color: "var(--success)", marginBottom: "0.5rem" }}>Greeting created. Share this link (expires in 3 days):</p>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <code style={{
              flex: "1",
              minWidth: "200px",
              padding: "0.5rem",
              background: "var(--bg)",
              borderRadius: "6px",
              fontSize: "0.9rem",
              wordBreak: "break-all",
            }}>
              {created.link}
            </code>
            <button
              type="button"
              onClick={copyLink}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                background: "var(--accent)",
                color: "#fff",
                border: "none",
              }}
            >
              Copy
            </button>
          </div>
          <p style={{ marginTop: "0.75rem", color: "var(--muted)", fontSize: "0.85rem" }}>
            Expires: {new Date(created.expiresAt).toLocaleString()}
          </p>
        </section>
          )}
        </section>

        <aside
          style={{
            flex: "1 1 50%",
            minWidth: "320px",
            minHeight: "calc(100vh - 6rem)",
            overflow: "auto",
          }}
        >
          {previewGreeting ? (
            <GreetingView greeting={previewGreeting} />
          ) : (
            <div style={{
              minHeight: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0c0a0f",
              color: "var(--muted)",
              fontFamily: "'Cormorant Garamond', serif",
              padding: "2rem",
            }}>
              Choose a design to see preview
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
