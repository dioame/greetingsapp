import Link from "next/link";
import { getDb } from "@/lib/turso";
import { syncDefaultGreetingDesigns } from "@/lib/sync-default-greeting-designs";
import { HeroVectorBg } from "@/components/landing/HeroVectorBg";
import { SectionDivider } from "@/components/landing/SectionDivider";

export const dynamic = "force-dynamic";

const sectionStyle = {
  width: "100%",
  maxWidth: "720px",
  margin: "0 auto",
  padding: "2rem 1.5rem",
};

const headingStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "clamp(1.5rem, 4vw, 2rem)",
  fontWeight: 600,
  marginBottom: "0.75rem",
  background: "linear-gradient(135deg, #f5f0f7, #c77dff)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text",
};

// Fallback when DB has no designs yet (e.g. before seed)
const FALLBACK_DESIGNS = [
  { name: "Swipable Book", description: "Turn pages like a real book to reveal your message.", accent: "#e94560" },
  { name: "Card Flip", description: "Elegant card that flips to reveal the greeting.", accent: "#e94560" },
  { name: "Reveal & Unveil", description: "Curtain or veil lifts to reveal your message.", accent: "#302b63" },
  { name: "Confetti Burst", description: "Celebratory confetti reveals the greeting.", accent: "#ff6b6b" },
  { name: "Minimal Elegant", description: "Clean, typography-focused design.", accent: "#2d3436" },
  { name: "Photo Frame", description: "Your message inside a beautiful frame.", accent: "#8b7355" },
  { name: "Typewriter", description: "Message appears as if being typed in real time.", accent: "#2c1810" },
  { name: "Valentine's Day", description: "Love-themed card for Valentine's Day.", accent: "#e91e63" },
  { name: "Mother's Day", description: "Warm, floral design to celebrate Mom.", accent: "#c75b6b" },
  { name: "Father's Day", description: "Classic design for Father's Day.", accent: "#1e3a5f" },
  { name: "Women's Month", description: "Celebrate Women's History Month.", accent: "#4a2c5e" },
  { name: "Christmas Day", description: "Festive holiday greeting.", accent: "#c41e3a" },
];

function getAccentFromConfig(config: Record<string, unknown>): string {
  const keys = ["accentColor", "accent", "primaryColor", "coverColor", "backColor", "curtainColor", "inkColor", "textColor"];
  for (const k of keys) {
    const v = config[k];
    if (typeof v === "string" && /^#[0-9a-fA-F]{3,8}$/.test(v)) return v;
  }
  return "var(--accent)";
}

async function getDesigns(): Promise<{ name: string; description: string; accent: string }[]> {
  try {
    const db = getDb();
    try {
      await syncDefaultGreetingDesigns(db);
    } catch {
      /* non-fatal */
    }
    const r = await db.execute({
      sql: "SELECT name, description, config_json FROM greeting_designs ORDER BY name",
      args: [],
    });
    if (r.rows.length === 0) return FALLBACK_DESIGNS;
    return r.rows.map((row) => {
      const config = row.config_json ? (JSON.parse(String(row.config_json)) as Record<string, unknown>) : {};
      return {
        name: String(row.name),
        description: String(row.description || ""),
        accent: getAccentFromConfig(config),
      };
    });
  } catch {
    return FALLBACK_DESIGNS;
  }
}

export default async function HomePage() {
  const designs = await getDesigns();
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0c0a0f 0%, #1a1520 50%, #0c0a0f 100%)",
      }}
    >
      {/* Hero with vector background */}
      <section
        className="landing-section"
        style={{
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
        }}
      >
        <HeroVectorBg />
        <div
          className="landing-hero-inner"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "720px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 600,
              letterSpacing: "0.02em",
              marginBottom: "0.75rem",
              background: "linear-gradient(135deg, #f5f0f7, #c77dff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Awesome Greetings By Dioame
          </h1>
          <p
            style={{
              color: "var(--muted)",
              marginBottom: "2rem",
              textAlign: "center",
              fontSize: "1.1rem",
              letterSpacing: "0.01em",
              lineHeight: 1.6,
            }}
          >
            Create and share beautiful, one-of-a-kind greetings.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/login"
              className="landing-cta-secondary"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--accent-dim)",
              }}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="landing-cta"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                background: "linear-gradient(135deg, var(--accent-dim), var(--accent))",
                color: "#fff",
                border: "none",
                boxShadow: "0 4px 14px rgba(123, 44, 191, 0.3)",
              }}
            >
              Create account
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* What it is */}
      <section className="landing-section" style={sectionStyle}>
        <h2 style={headingStyle}>What is it?</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: "1.05rem" }}>
          Awesome Greetings By Dioame is a free app where you pick a design, add a recipient and message, and get a unique shareable link. Your friends and family open the link to see a beautiful, interactive greeting—no app install needed. Perfect for birthdays, Valentine&apos;s Day, Mother&apos;s Day, Father&apos;s Day, Christmas, Women&apos;s Month, or any occasion.
        </p>
      </section>

      <SectionDivider />

      {/* Greeting designs showcase */}
      <section
        className="landing-section"
        style={{
          ...sectionStyle,
          maxWidth: "900px",
          paddingTop: "0.5rem",
          paddingBottom: "2.5rem",
        }}
      >
        <h2 style={{ ...headingStyle, textAlign: "center" as const, marginBottom: "1.5rem" }}>
          Greeting designs
        </h2>
        <p style={{ color: "var(--muted)", textAlign: "center", marginBottom: "1.5rem", lineHeight: 1.6, fontSize: "1.05rem" }}>
          Pick a style when you create a greeting—each opens in a unique, shareable experience.
        </p>
        <ul
          style={{
            listStyle: "none",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.25rem",
            margin: 0,
            padding: 0,
          }}
        >
          {designs.map((d) => (
            <li
              key={d.name}
              className="landing-card"
              style={{
                background: "var(--surface)",
                borderRadius: "12px",
                border: "1px solid var(--accent-dim)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "4px",
                  background: d.accent,
                  width: "100%",
                }}
              />
              <div style={{ padding: "1rem 1.25rem" }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {d.name}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>
                  {d.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <SectionDivider />

      {/* Features */}
      <section className="landing-section" style={sectionStyle}>
        <h2 style={headingStyle}>What you can do</h2>
        <ul style={{ color: "var(--muted)", lineHeight: 1.9, paddingLeft: "1.25rem", fontSize: "1.05rem" }}>
          <li>Choose from multiple designs: flip cards, confetti, typewriter, photo frames, and themed templates.</li>
          <li>Personalize with recipient name, your name, and a custom message.</li>
          <li>Get a shareable link to send via chat, email, or social media.</li>
          <li>Recipients view the greeting in the browser—no sign-up required.</li>
        </ul>
      </section>

      <SectionDivider />

      {/* CTA */}
      <section
        className="landing-section"
        style={{
          ...sectionStyle,
          textAlign: "center",
          paddingTop: "1rem",
          paddingBottom: "2rem",
        }}
      >
        <p style={{ color: "var(--muted)", marginBottom: "1.5rem", fontSize: "1.05rem" }}>
          Ready to send something special?
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/register"
            className="landing-cta"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--accent-dim), var(--accent))",
              color: "#fff",
              border: "none",
              boxShadow: "0 4px 14px rgba(123, 44, 191, 0.3)",
            }}
          >
            Create account
          </Link>
          <Link
            href="/login"
            className="landing-cta-secondary"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "10px",
              background: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--accent-dim)",
            }}
          >
            Sign in
          </Link>
        </div>
      </section>

      <SectionDivider />

      {/* Donate highlight */}
      <section
        className="landing-section"
        style={{
          ...sectionStyle,
          background: "linear-gradient(135deg, rgba(123, 44, 191, 0.15), rgba(199, 125, 255, 0.08))",
          borderRadius: "16px",
          border: "1px solid var(--accent-dim)",
          margin: "0 auto 2rem",
          maxWidth: "720px",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h2 style={headingStyle}>Support this project</h2>
        <p style={{ color: "var(--muted)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
          Enjoying Awesome Greetings? A small donation helps keep it running and supports new designs and features.
        </p>
        <Link
          href="/donate"
          className="landing-cta"
          style={{
            display: "inline-block",
            padding: "0.875rem 1.75rem",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #e07a7a 0%, #c77dff 100%)",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            boxShadow: "0 4px 14px rgba(199, 125, 255, 0.35)",
          }}
        >
          Donate
        </Link>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          PayPal &amp; GCash available on the donate page.
        </p>
      </section>

      <SectionDivider />

      {/* Contact developer */}
      <section
        className="landing-section"
        style={{
          ...sectionStyle,
          paddingTop: "1rem",
          paddingBottom: "3rem",
          borderTop: "1px solid rgba(155, 143, 168, 0.2)",
        }}
      >
        <h2 style={headingStyle}>Contact developer</h2>
        <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
          <strong style={{ color: "var(--text)" }}>DIOAME JADE C. RENDON</strong>
        </p>
        <a
          href="mailto:dioamejade@gmail.com"
          style={{
            color: "var(--accent)",
            fontSize: "1.05rem",
          }}
        >
          dioamejade@gmail.com
        </a>
      </section>
    </main>
  );
}
