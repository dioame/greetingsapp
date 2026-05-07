"use client";

import Link from "next/link";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

export function MothersDay({ greeting }: { greeting: Greeting }) {
  const config = greeting.design.config as { bgColor?: string; textColor?: string; accentColor?: string };
  const bgColor = (config.bgColor as string) || "#fdf8f3";
  const textColor = (config.textColor as string) || "#2d1f1a";
  const accent = (config.accentColor as string) || "#c75b6b";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundImage: "url('/assets/mothersday/7036236.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.10) 42%, rgba(0,0,0,0.46) 100%), radial-gradient(1100px 700px at 50% 40%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.00) 60%)",
        }}
      />
      <article
        style={{
          maxWidth: "480px",
          width: "100%",
          background: `linear-gradient(180deg, ${bgColor}e6 0%, #ffffffee 100%)`,
          backdropFilter: "blur(8px)",
          borderRadius: "24px",
          padding: "2.5rem",
          boxShadow: "0 20px 60px rgba(199, 91, 107, 0.12)",
          border: `1px solid ${accent}20`,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Corner florals */}
        <svg
          aria-hidden
          viewBox="0 0 120 120"
          style={{ position: "absolute", top: "-14px", left: "-10px", width: "110px", height: "110px", opacity: 0.35 }}
        >
          <path d="M26 44c10-12 24-18 38-18 11 0 20 4 28 11-11 2-20 7-26 16-5 7-7 15-7 24-9-7-18-12-28-14-10-2-20-1-30 2 3-8 7-15 12-21z" fill={accent} opacity="0.14" />
          <path d="M41 76c5-12 15-18 28-18 9 0 17 3 24 9-10 2-18 6-23 13-4 6-5 12-4 19-7-5-14-9-22-10-8-1-16 0-24 3 6-6 14-11 21-16z" fill={accent} opacity="0.11" />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 120 120"
          style={{ position: "absolute", bottom: "-16px", right: "-12px", width: "118px", height: "118px", opacity: 0.35, transform: "rotate(180deg)" }}
        >
          <path d="M26 44c10-12 24-18 38-18 11 0 20 4 28 11-11 2-20 7-26 16-5 7-7 15-7 24-9-7-18-12-28-14-10-2-20-1-30 2 3-8 7-15 12-21z" fill={accent} opacity="0.14" />
          <path d="M41 76c5-12 15-18 28-18 9 0 17 3 24 9-10 2-18 6-23 13-4 6-5 12-4 19-7-5-14-9-22-10-8-1-16 0-24 3 6-6 14-11 21-16z" fill={accent} opacity="0.11" />
        </svg>

        <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: accent, marginBottom: "0.35rem", textTransform: "uppercase" }}>
          MOTHER&apos;S DAY
        </p>
        <div style={{ width: "40px", height: "2px", background: accent, marginBottom: "1.5rem", transformOrigin: "left" }} />
        <p style={{ color: accent, fontSize: "1.05rem", marginBottom: "0.1rem", fontFamily: '"Dancing Script", "Parisienne", "Segoe Script", cursive', letterSpacing: "0.01em" }}>
          With all my love
        </p>
        <h1
          style={{
            fontSize: "2.05rem",
            color: textColor,
            fontWeight: 600,
            marginBottom: "0.8rem",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            fontFamily: '"Fraunces", "Playfair Display", ui-serif, Georgia, serif',
            textShadow: "0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          To {greeting.recipientName}
        </h1>
        <p style={{ color: textColor, lineHeight: 1.9, fontSize: "1.1rem", whiteSpace: "pre-wrap" }}>
          {greeting.message}
        </p>
        {greeting.senderName && (
          <p style={{ marginTop: "1.5rem", color: textColor, opacity: 0.85, fontStyle: "italic" }}>
            — {greeting.senderName}
          </p>
        )}
        <p style={{ marginTop: "2rem", fontSize: "0.7rem", letterSpacing: "0.12em", color: accent, opacity: 0.7 }}>
          Greet with{" "}
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Awesome Greetings
          </Link>
        </p>
      </article>
    </div>
  );
}
