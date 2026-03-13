"use client";

import { useState, useEffect } from "react";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

// Softer, more cohesive palette — warm golds and soft pastels
const COLORS = ["#e8d5b7", "#d4a574", "#c9b896", "#f5e6d3", "#b8a99a", "#e2c9a8"];

type Shape = "strip" | "square" | "circle";

const particleConfig = Array.from({ length: 60 }, (_, i) => {
  const shape: Shape = i % 3 === 0 ? "circle" : i % 3 === 1 ? "square" : "strip";
  const isStrip = shape === "strip";
  return {
    color: COLORS[i % COLORS.length],
    delay: Math.random() * 0.35,
    duration: 1.8 + Math.random() * 0.6,
    endX: (Math.random() - 0.5) * 120,
    endY: -70 - Math.random() * 40,
    rotation: (Math.random() - 0.5) * 1440,
    width: isStrip ? 6 + Math.random() * 4 : 6 + Math.random() * 6,
    height: isStrip ? 2 : 6 + Math.random() * 6,
    borderRadius: shape === "circle" ? "50%" : shape === "strip" ? "1px" : "2px",
    shape,
  };
});

export function ConfettiBurst({ greeting }: { greeting: Greeting }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(165deg, #0f0d12 0%, #1a151f 45%, #151218 100%)",
      overflow: "hidden",
    }}>
      {particleConfig.map((p, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            width: p.width,
            height: p.height,
            marginLeft: -p.width / 2,
            marginTop: -p.height / 2,
            background: p.color,
            borderRadius: p.borderRadius,
            opacity: show ? 0 : 1,
            transform: "translate(0, 0) rotate(0deg)",
            animation: show
              ? `confetti-${i} ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}s forwards`
              : "none",
            pointerEvents: "none",
            zIndex: 0,
            boxShadow: p.shape === "strip" ? "none" : "0 0 0 1px rgba(255,255,255,0.06)",
          }}
        />
      ))}
      <style>{`
        @media (prefers-reduced-motion: reduce) { .cb-card { animation: none !important; } }
        @keyframes cbCardEntrance {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        ${particleConfig
          .map(
            (p, i) => `
        @keyframes confetti-${i} {
          from {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg);
          }
          to {
            opacity: 0;
            transform: translate(${p.endX}vw, ${p.endY}vh) rotate(${p.rotation}deg);
          }
        }
      `
          )
          .join("")}
      `}</style>
      <div className="cb-card" style={{
        maxWidth: "420px",
        width: "100%",
        padding: "2.5rem",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        animation: "cbCardEntrance 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both",
      }}>
        <p style={{ fontSize: "0.8rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>
          HELLO
        </p>
        <h1 style={{ fontSize: "2rem", color: "#fff", fontWeight: 400, marginBottom: "1.5rem" }}>
          {greeting.recipientName}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
          {greeting.message}
        </p>
        {greeting.senderName && (
          <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
            — {greeting.senderName}
          </p>
        )}
        <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
          Awesome Greetings By Dioame
        </p>
      </div>
    </div>
  );
}
