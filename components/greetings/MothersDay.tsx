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
        background: `linear-gradient(180deg, #fff7fb 0%, #f7efe9 45%, #fff7fb 100%)`,
        fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .md-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(1200px 700px at 18% 20%, ${accent}1a 0%, transparent 60%),
            radial-gradient(900px 600px at 80% 75%, ${accent}14 0%, transparent 62%),
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.65) 0 2px, transparent 3px) 0 0 / 24px 24px,
            radial-gradient(circle at 70% 60%, rgba(255,255,255,0.45) 0 1px, transparent 2px) 0 0 / 18px 18px;
          opacity: 0.75;
          filter: blur(0px);
          transform: translateZ(0);
          animation: mdBgShimmer 10s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .md-card, .md-accent, .md-float, .md-bg, .md-sparkle { animation: none !important; }
          .md-card { transform: none !important; }
        }
        @keyframes mdCardEntrance {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes mdAccentGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes mdFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.14; }
          50% { transform: translateY(-10px) translateX(2px); opacity: 0.26; }
        }
        @keyframes mdBgShimmer {
          0%, 100% { opacity: 0.62; filter: saturate(1); }
          50% { opacity: 0.86; filter: saturate(1.15); }
        }
        @keyframes mdSparkle {
          0% { transform: translateY(0) scale(0.95); opacity: 0; }
          20% { opacity: 0.65; }
          60% { opacity: 0.35; }
          100% { transform: translateY(-14px) scale(1.06); opacity: 0; }
        }
        .md-card {
          transition: transform 220ms ease, box-shadow 220ms ease;
          will-change: transform;
        }
        .md-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 28px 80px rgba(199, 91, 107, 0.14);
        }
        .md-kicker { text-transform: uppercase; }
        .md-script {
          font-family: "Dancing Script", "Parisienne", "Segoe Script", cursive;
          letter-spacing: 0.01em;
        }
      `}</style>
      <div className="md-bg" aria-hidden />
      {/* Decorative floating circles */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <circle className="md-float" cx="15%" cy="20%" r="44" fill={accent} opacity="0.06" style={{ animation: "mdFloat 5s ease-in-out infinite" }} />
        <circle className="md-float" cx="88%" cy="75%" r="66" fill={accent} opacity="0.05" style={{ animation: "mdFloat 6s ease-in-out 1s infinite" }} />
        <circle className="md-float" cx="78%" cy="18%" r="26" fill={accent} opacity="0.05" style={{ animation: "mdFloat 4.5s ease-in-out 0.6s infinite" }} />
      </svg>
      {/* Subtle sparkles */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <g className="md-sparkle" style={{ animation: "mdSparkle 3.6s ease-in-out 0.2s infinite" }}>
          <path d="M0 10 L10 0 L20 10 L10 20 Z" fill={accent} opacity="0.08" transform="translate(72 120) rotate(12)" />
        </g>
        <g className="md-sparkle" style={{ animation: "mdSparkle 4.2s ease-in-out 1.1s infinite" }}>
          <path d="M0 8 L8 0 L16 8 L8 16 Z" fill={accent} opacity="0.07" transform="translate(320 420) rotate(-8)" />
        </g>
        <g className="md-sparkle" style={{ animation: "mdSparkle 4.8s ease-in-out 0.6s infinite" }}>
          <path d="M0 7 L7 0 L14 7 L7 14 Z" fill={accent} opacity="0.06" transform="translate(140 520) rotate(18)" />
        </g>
      </svg>
      <article
        className="md-card"
        style={{
          maxWidth: "480px",
          width: "100%",
          background: `linear-gradient(180deg, ${bgColor} 0%, #ffffff 100%)`,
          borderRadius: "24px",
          padding: "2.5rem",
          boxShadow: "0 20px 60px rgba(199, 91, 107, 0.12)",
          border: `1px solid ${accent}20`,
          animation: "mdCardEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
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

        <p className="md-kicker" style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: accent, marginBottom: "0.35rem" }}>
          MOTHER&apos;S DAY
        </p>
        <div className="md-accent" style={{ width: "40px", height: "2px", background: accent, marginBottom: "1.5rem", transformOrigin: "left", animation: "mdAccentGrow 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" }} />
        <p className="md-script" style={{ color: accent, fontSize: "1.05rem", marginBottom: "0.1rem" }}>
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
