"use client";

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
        background: `linear-gradient(180deg, #fdf8f3 0%, #f5ebe0 50%, #fdf8f3 100%)`,
        fontFamily: "'Cormorant Garamond', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) { .md-card, .md-accent { animation: none !important; } }
        @keyframes mdCardEntrance {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes mdAccentGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes mdFloat {
          0%, 100% { transform: translateY(0); opacity: 0.15; }
          50% { transform: translateY(-8px); opacity: 0.25; }
        }
      `}</style>
      {/* Decorative floating circles */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <circle cx="15%" cy="20%" r="40" fill={accent} opacity="0.06" style={{ animation: "mdFloat 5s ease-in-out infinite" }} />
        <circle cx="88%" cy="75%" r="60" fill={accent} opacity="0.05" style={{ animation: "mdFloat 6s ease-in-out 1s infinite" }} />
      </svg>
      <article
        className="md-card"
        style={{
          maxWidth: "480px",
          width: "100%",
          background: bgColor,
          borderRadius: "24px",
          padding: "2.5rem",
          boxShadow: "0 20px 60px rgba(199, 91, 107, 0.12)",
          border: `1px solid ${accent}20`,
          animation: "mdCardEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.25em", color: accent, marginBottom: "0.5rem" }}>
          MOTHER&apos;S DAY
        </p>
        <div className="md-accent" style={{ width: "40px", height: "2px", background: accent, marginBottom: "1.5rem", transformOrigin: "left", animation: "mdAccentGrow 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" }} />
        <h1 style={{ fontSize: "1.75rem", color: textColor, fontWeight: 500, marginBottom: "1rem" }}>
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
        <p style={{ marginTop: "2rem", fontSize: "0.7rem", letterSpacing: "0.15em", color: accent, opacity: 0.7 }}>
          With love · Awesome Greetings By Dioame
        </p>
      </article>
    </div>
  );
}
