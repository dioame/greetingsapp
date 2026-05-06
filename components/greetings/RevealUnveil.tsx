"use client";

import { useState } from "react";
import Link from "next/link";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

export function RevealUnveil({ greeting }: { greeting: Greeting }) {
  const [revealed, setRevealed] = useState(false);
  const config = greeting.design.config as { curtainColor?: string };
  const curtainColor = (config.curtainColor as string) || "#1a1a2e";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      overflow: "hidden",
      position: "relative",
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) { .ru-content-inner { animation: none !important; } }
        @keyframes ruContentEntrance {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ruShine {
          0% { opacity: 0; transform: translateX(-100%); }
          60% { opacity: 0.4; transform: translateX(100%); }
          100% { opacity: 0; transform: translateX(100%); }
        }
      `}</style>
      {/* Subtle grid */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.04 }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="ruGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#ruGrid)" />
      </svg>
      <div style={{ position: "relative", width: "100%", maxWidth: "440px", minHeight: "400px", zIndex: 1 }}>
        {/* Curtain */}
        <div
          onClick={() => setRevealed(true)}
          style={{
            position: "absolute",
            inset: 0,
            background: curtainColor,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: revealed ? "default" : "pointer",
            transform: revealed ? "translateY(-100%)" : "translateY(0)",
            transition: "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            zIndex: 2,
          }}
        >
          <div style={{ fontSize: "0.8rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>
            A MESSAGE AWAITS
          </div>
          <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 400 }}>
            {greeting.recipientName}
          </h2>
          <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
            Tap to unveil
          </p>
        </div>
        {/* Content */}
        <div style={{
          position: "relative",
          minHeight: "400px",
          padding: "2.5rem",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <div className="ru-content-inner" style={{ opacity: revealed ? undefined : 0, animation: revealed ? "ruContentEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "none" }}>
          <p style={{ color: "rgba(255,255,255,0.95)", lineHeight: 1.85, fontSize: "1.05rem", whiteSpace: "pre-wrap" }}>
            {greeting.message}
          </p>
          {greeting.senderName && (
            <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
              — {greeting.senderName}
            </p>
          )}
          <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
            Greet with{" "}
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Awesome Greetings
            </Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
