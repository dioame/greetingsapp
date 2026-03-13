"use client";

import Link from "next/link";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

export function PhotoFrame({ greeting }: { greeting: Greeting }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(180deg, #1c1917 0%, #292524 100%)",
      fontFamily: "'Cormorant Garamond', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) { .pf-frame, .pf-line { animation: none !important; } }
        @keyframes pfFrameEntrance {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pfLineDraw {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
      <div className="pf-frame" style={{
        maxWidth: "440px",
        width: "100%",
        padding: "2rem",
        background: "#f5f5dc",
        boxShadow: "inset 0 0 0 12px #8b7355, inset 0 0 0 14px #1c1917, 0 25px 80px rgba(0,0,0,0.5)",
        borderRadius: "2px",
        animation: "pfFrameEntrance 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      }}>
        <p style={{ fontSize: "0.8rem", letterSpacing: "0.2em", color: "#5c5346", marginBottom: "0.5rem" }}>
          To {greeting.recipientName}
        </p>
        <div className="pf-line" style={{ width: "40px", height: "1px", background: "#8b7355", marginBottom: "1.5rem", transformOrigin: "left", animation: "pfLineDraw 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" }} />
        <p style={{ color: "#2c1810", fontSize: "1.15rem", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>
          {greeting.message}
        </p>
        {greeting.senderName && (
          <p style={{ marginTop: "1.5rem", color: "#5c5346", fontStyle: "italic" }}>
            — {greeting.senderName}
          </p>
        )}
        <p style={{ marginTop: "1.5rem", fontSize: "0.7rem", letterSpacing: "0.1em", color: "#8b7355" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Awesome Greetings</Link>
        </p>
      </div>
    </div>
  );
}
