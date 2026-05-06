"use client";

import Link from "next/link";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

export function FathersDay({ greeting }: { greeting: Greeting }) {
  const config = greeting.design.config as { paperColor?: string; inkColor?: string };
  const paperColor = (config.paperColor as string) || "#f0ebe3";
  const inkColor = (config.inkColor as string) || "#1e3a5f";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "linear-gradient(165deg, #1a2332 0%, #0f1923 100%)",
        fontFamily: "'Georgia', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) { .fd-card, .fd-line { animation: none !important; } }
        @keyframes fdCardEntrance {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fdLineDraw {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
      {/* Subtle vector accent lines */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.08 }} viewBox="0 0 400 600" fill="none">
        <line x1="80" y1="100" x2="320" y2="100" stroke={inkColor} strokeWidth="1" strokeDasharray="4 8" />
        <line x1="320" y1="500" x2="80" y2="500" stroke={inkColor} strokeWidth="1" strokeDasharray="4 8" />
      </svg>
      <div
        className="fd-card"
        style={{
          maxWidth: "440px",
          width: "100%",
          background: paperColor,
          padding: "2.5rem 2rem",
          borderRadius: "4px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5)",
          border: "1px solid rgba(30, 58, 95, 0.15)",
          animation: "fdCardEntrance 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: inkColor, opacity: 0.7, marginBottom: "0.5rem" }}>
          FATHER&apos;S DAY
        </p>
        <div className="fd-line" style={{ width: "48px", height: "1px", background: inkColor, opacity: 0.4, marginBottom: "1.5rem", transformOrigin: "left", animation: "fdLineDraw 0.5s ease-out 0.25s both" }} />
        <h1 style={{ fontSize: "1.6rem", color: inkColor, fontWeight: 600, marginBottom: "1rem" }}>
          {greeting.recipientName}
        </h1>
        <p style={{ color: inkColor, lineHeight: 1.85, fontSize: "1rem", whiteSpace: "pre-wrap" }}>
          {greeting.message}
        </p>
        {greeting.senderName && (
          <p style={{ marginTop: "1.5rem", color: inkColor, opacity: 0.8, fontStyle: "italic" }}>
            — {greeting.senderName}
          </p>
        )}
        <p style={{ marginTop: "2rem", fontSize: "0.7rem", color: inkColor, opacity: 0.5 }}>
          Greet with{" "}
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Awesome Greetings
          </Link>
        </p>
      </div>
    </div>
  );
}
