"use client";

import { useState } from "react";
import Link from "next/link";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

export function CardFlip({ greeting }: { greeting: Greeting }) {
  const [flipped, setFlipped] = useState(false);
  const config = greeting.design.config as { backColor?: string; frontColor?: string; accent?: string };
  const backColor = (config.backColor as string) || "#16213e";
  const frontColor = (config.frontColor as string) || "#0f3460";
  const accent = (config.accent as string) || "#e94560";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(160deg, #0a0a12 0%, #1a1525 100%)",
      perspective: "1000px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) { .cf-float { animation: none !important; } }
        @keyframes cfCardEntrance {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cfFloat {
          0%, 100% { transform: translate(0, 0); opacity: 0.12; }
          50% { transform: translate(6px, -6px); opacity: 0.2; }
        }
      `}</style>
      {/* Ambient shapes */}
      <div className="cf-float" style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`, top: "15%", left: "10%", pointerEvents: "none", animation: "cfFloat 8s ease-in-out infinite" }} />
      <div className="cf-float" style={{ position: "absolute", width: "150px", height: "150px", borderRadius: "50%", background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`, bottom: "20%", right: "15%", pointerEvents: "none", animation: "cfFloat 10s ease-in-out 2s infinite" }} />
      <div
        onClick={() => setFlipped(true)}
        style={{
          width: "100%",
          maxWidth: "400px",
          minHeight: "420px",
          position: "relative",
          cursor: flipped ? "default" : "pointer",
          transformStyle: "preserve-3d",
          animation: "cfCardEntrance 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          zIndex: 1,
        }}
      >
        <div style={{
          position: "relative",
          width: "100%",
          minHeight: "420px",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: "16px",
          boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
        }}>
          {/* Front */}
          <div style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: `linear-gradient(145deg, ${backColor} 0%, ${frontColor} 100%)`,
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>
              FOR YOU
            </div>
            <h1 style={{ fontSize: "2.2rem", color: "#fff", fontWeight: 300 }}>
              {greeting.recipientName}
            </h1>
            <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              Click to open
            </p>
            <div style={{ marginTop: "1rem", width: "60px", height: "2px", background: accent }} />
          </div>
          {/* Back */}
          <div style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(145deg, ${frontColor} 0%, ${backColor} 100%)`,
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2.5rem",
          }}>
            <p style={{ color: "rgba(255,255,255,0.95)", lineHeight: 1.9, fontSize: "1rem", textAlign: "center", whiteSpace: "pre-wrap" }}>
              {greeting.message}
            </p>
            {greeting.senderName && (
              <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
                — {greeting.senderName}
              </p>
            )}
            <div style={{ marginTop: "1.5rem", width: "40px", height: "2px", background: accent }} />
            <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
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
