"use client";

import { useState } from "react";
import Link from "next/link";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

export function WomensMonth({ greeting }: { greeting: Greeting }) {
  const [revealed, setRevealed] = useState(false);

  const purple = "#6b21a8";
  const purpleLight = "#a855f7";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "linear-gradient(160deg, #ffffff 0%, #f8f5fc 50%, #ffffff 100%)",
        fontFamily: "'Cormorant Garamond', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) { .wm-cover, .wm-card, .wm-shape { animation: none !important; } }
        @keyframes wmCoverEntrance {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes wmCardEntrance {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wmFloat {
          0%, 100% { transform: translate(0, 0); opacity: 0.08; }
          50% { transform: translate(4px, -8px); opacity: 0.15; }
        }
      `}</style>
      {/* Decorative shapes */}
      <div className="wm-shape" style={{ position: "absolute", width: "120px", height: "120px", borderRadius: "50%", border: `2px solid ${purple}`, top: "12%", right: "8%", opacity: 0.1, animation: "wmFloat 7s ease-in-out infinite", pointerEvents: "none" }} />
      <div className="wm-shape" style={{ position: "absolute", width: "80px", height: "80px", borderRadius: "50%", border: `2px solid ${purpleLight}`, bottom: "15%", left: "10%", opacity: 0.12, animation: "wmFloat 6s ease-in-out 1.5s infinite", pointerEvents: "none" }} />
      <div style={{ maxWidth: "460px", width: "100%", position: "relative", zIndex: 1 }}>
        <div
          className="wm-cover"
          onClick={() => !revealed && setRevealed(true)}
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(160deg, ${purple} 0%, ${purpleLight} 100%)`,
            display: revealed ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            cursor: "pointer",
            border: "2px solid rgba(255,255,255,0.3)",
            boxShadow: "0 10px 40px rgba(107, 33, 168, 0.25)",
            transition: "opacity 0.5s ease",
            animation: "wmCoverEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        >
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.9)", marginBottom: "0.5rem" }}>
              WOMEN&apos;S HISTORY MONTH
            </p>
            <h2 style={{ fontSize: "1.5rem", color: "#fff", fontWeight: 400 }}>
              For {greeting.recipientName}
            </h2>
            <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.85)", fontSize: "0.9rem" }}>
              Click to reveal
            </p>
          </div>
        </div>
        <div
          className="wm-card"
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "2.5rem",
            border: `2px solid ${purpleLight}`,
            boxShadow: "0 4px 24px rgba(107, 33, 168, 0.12)",
            animation: "wmCardEntrance 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        >
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: purple, marginBottom: "0.5rem" }}>
            CELEBRATING YOU
          </p>
          <h1 style={{ fontSize: "1.75rem", color: "#2d1b4e", fontWeight: 500, marginBottom: "1.5rem" }}>
            {greeting.recipientName}
          </h1>
          <p style={{ color: "#374151", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
            {greeting.message}
          </p>
          {greeting.senderName && (
            <p style={{ marginTop: "1.5rem", color: "#4c1d95", fontStyle: "italic" }}>
              — {greeting.senderName}
            </p>
          )}
          <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: purpleLight }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Awesome Greetings</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
