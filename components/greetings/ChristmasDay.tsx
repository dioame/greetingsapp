"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

const SNOWFLAKES = 40;
const COLORS = ["#c41e3a", "#165b33", "#e8d5b7", "#1a472a", "#b8860b"];

export function ChristmasDay({ greeting }: { greeting: Greeting }) {
  const [burst, setBurst] = useState(false);
  const [flakes, setFlakes] = useState<{ x: number; delay: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    setFlakes(
      Array.from({ length: SNOWFLAKES }, () => ({
        x: Math.random() * 100 - 50,
        delay: Math.random() * 2,
        size: 4 + Math.random() * 6,
        duration: 3 + Math.random() * 4,
      }))
    );
    const t = setTimeout(() => setBurst(true), 200);
    return () => clearTimeout(t);
  }, []);

  const config = greeting.design.config as { primaryColor?: string; secondaryColor?: string };
  const primary = (config.primaryColor as string) || "#c41e3a";
  const secondary = (config.secondaryColor as string) || "#165b33";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "linear-gradient(180deg, #0d1f14 0%, #1a2e1f 40%, #0d1f14 100%)",
        overflow: "hidden",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {/* Falling snow */}
      {flakes.map((f, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: "50%",
            top: "-20px",
            width: f.size,
            height: f.size,
            background: "rgba(255,255,255,0.9)",
            borderRadius: "50%",
            transform: `translate(${f.x}vw, 0)`,
            animation: `snow-fall ${f.duration}s linear ${f.delay}s infinite`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* Confetti burst on load — each piece has a fixed direction */}
      {burst &&
        [
          { color: COLORS[0], tx: -60, ty: -180 },
          { color: COLORS[1], tx: 50, ty: -160 },
          { color: COLORS[2], tx: -40, ty: -200 },
          { color: COLORS[3], tx: 70, ty: -150 },
          { color: COLORS[4], tx: 0, ty: -220 },
        ].map((item, i) => (
          <div
            key={`c-${i}`}
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              width: 8,
              height: 8,
              marginLeft: -4,
              marginTop: -4,
              background: item.color,
              borderRadius: i % 2 === 0 ? "50%" : "2px",
              opacity: 0,
              animation: `christmas-burst-${i} 1.5s ease-out ${i * 0.08}s forwards`,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        ))}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); opacity: 0.6; }
          to { transform: scaleX(1); opacity: 1; }
        }
        @keyframes snow-fall {
          to { transform: translate(0, 110vh); }
        }
        @keyframes christmas-burst-0 {
          from { opacity: 1; transform: translate(0, 0) scale(1); }
          to { opacity: 0; transform: translate(-60px, -180px) scale(0.2); }
        }
        @keyframes christmas-burst-1 {
          from { opacity: 1; transform: translate(0, 0) scale(1); }
          to { opacity: 0; transform: translate(50px, -160px) scale(0.2); }
        }
        @keyframes christmas-burst-2 {
          from { opacity: 1; transform: translate(0, 0) scale(1); }
          to { opacity: 0; transform: translate(-40px, -200px) scale(0.2); }
        }
        @keyframes christmas-burst-3 {
          from { opacity: 1; transform: translate(0, 0) scale(1); }
          to { opacity: 0; transform: translate(70px, -150px) scale(0.2); }
        }
        @keyframes christmas-burst-4 {
          from { opacity: 1; transform: translate(0, 0) scale(1); }
          to { opacity: 0; transform: translate(0, -220px) scale(0.2); }
        }
      `}</style>

      <div
        style={{
          maxWidth: "420px",
          width: "100%",
          padding: "2.5rem",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "16px",
          border: `2px solid ${primary}40`,
          position: "relative",
          zIndex: 1,
          boxShadow: `0 0 30px ${secondary}30`,
          animation: "cardEntrance 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      >
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: primary, marginBottom: "0.5rem" }}>
          MERRY CHRISTMAS
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", alignItems: "center" }}>
          <div style={{ flex: 1, height: "2px", background: primary, transformOrigin: "left", animation: "lineExpand 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" }} />
          <span style={{ color: secondary, fontSize: "1rem" }}>✦</span>
          <div style={{ flex: 1, height: "2px", background: secondary, transformOrigin: "right", animation: "lineExpand 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" }} />
        </div>
        <h1 style={{ fontSize: "1.75rem", color: "#fff", fontWeight: 500, marginBottom: "1rem" }}>
          {greeting.recipientName}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>
          {greeting.message}
        </p>
        {greeting.senderName && (
          <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.75)", fontStyle: "italic" }}>
            — {greeting.senderName}
          </p>
        )}
        <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
          Greet with{" "}
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Awesome Greetings
          </Link>
        </p>
      </div>
    </div>
  );
}
