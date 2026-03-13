"use client";

import { useState } from "react";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

const floatingHearts = [
  { size: 12, left: "8%", top: "15%", delay: 0, duration: 4 },
  { size: 16, left: "85%", top: "20%", delay: 0.5, duration: 5 },
  { size: 10, left: "15%", top: "70%", delay: 1, duration: 4.5 },
  { size: 14, left: "78%", top: "65%", delay: 0.3, duration: 5.2 },
  { size: 8, left: "92%", top: "45%", delay: 1.2, duration: 3.8 },
  { size: 11, left: "5%", top: "45%", delay: 0.8, duration: 4.2 },
  { size: 13, left: "88%", top: "82%", delay: 0.2, duration: 4.8 },
  { size: 9, left: "12%", top: "88%", delay: 1.5, duration: 5 },
];

function HeartIcon({ size = 16, style = {} }: { size?: number; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        fontSize: size,
        opacity: 0.85,
        display: "inline-block",
        filter: "drop-shadow(0 0 4px rgba(233, 30, 99, 0.4))",
        ...style,
      }}
      aria-hidden
    >
      ♥
    </span>
  );
}

export function ValentineDay({ greeting }: { greeting: Greeting }) {
  const [opened, setOpened] = useState(false);
  const config = greeting.design.config as { accent?: string; bgColor?: string };
  const accent = (config.accent as string) || "#e91e63";
  const bgColor = (config.bgColor as string) || "#fff5f7";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "#ffffff",
        fontFamily: "'Cormorant Garamond', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle romantic glow orbs on white */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`,
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)`,
          bottom: "15%",
          right: "10%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)`,
          bottom: "20%",
          left: "5%",
          pointerEvents: "none",
        }}
      />

      {/* Floating hearts */}
      {floatingHearts.map((h, i) => (
        <span
          key={i}
          className="vd-float-heart"
          style={{
            position: "absolute",
            left: h.left,
            top: h.top,
            fontSize: h.size,
            color: accent,
            opacity: 0.35,
            animation: `floatHeart 4s ease-in-out ${h.delay}s infinite`,
            pointerEvents: "none",
          }}
          aria-hidden
        >
          ♥
        </span>
      ))}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .vd-card, .vd-float-heart { animation: none !important; }
        }
        @keyframes vdCardEntrance {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floatHeart {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.35; }
          50% { transform: translateY(-12px) scale(1.1); opacity: 0.55; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 30px ${accent}40; }
          50% { box-shadow: 0 0 50px ${accent}60; }
        }
      `}</style>

      <div
        onClick={() => !opened && setOpened(true)}
        style={{
          maxWidth: "420px",
          width: "100%",
          cursor: opened ? "default" : "pointer",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="vd-card"
          style={{
            background: opened ? "transparent" : `linear-gradient(145deg, #fff5f8 0%, #ffe8ef 100%)`,
            border: `2px solid ${accent}`,
            borderRadius: "20px",
            padding: "2.5rem",
            boxShadow: opened ? "none" : `0 0 30px ${accent}30, 0 10px 40px rgba(0,0,0,0.08)`,
            transition: "all 0.6s ease",
            animation: opened ? "none" : "vdCardEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards, pulseGlow 2.5s ease-in-out infinite 0.6s",
          }}
        >
          {/* Corner hearts - closed card */}
          {!opened && (
            <>
              <HeartIcon size={20} style={{ position: "absolute", top: "1rem", right: "1rem", color: accent }} />
              <HeartIcon size={16} style={{ position: "absolute", top: "1rem", left: "1rem", color: accent, opacity: 0.7 }} />
              <HeartIcon size={14} style={{ position: "absolute", bottom: "1rem", right: "1.25rem", color: accent, opacity: 0.6 }} />
              <HeartIcon size={18} style={{ position: "absolute", bottom: "1rem", left: "1.25rem", color: accent, opacity: 0.7 }} />
            </>
          )}

          {!opened ? (
            <>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: accent, marginBottom: "0.5rem", opacity: 0.9 }}>
                VALENTINE&apos;S DAY
              </p>
              <h1 style={{ fontSize: "2rem", color: "#4a1528", fontWeight: 400 }}>
                For {greeting.recipientName}
              </h1>
              <p style={{ marginTop: "1.5rem", color: "#6b2d3d", fontSize: "0.9rem" }}>
                Tap to open ♥
              </p>
              <span style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", fontSize: "1.25rem", color: accent, opacity: 0.8 }}>
                ♥ ♥ ♥
              </span>
            </>
          ) : (
            <div
              style={{
                background: bgColor,
                margin: "-1.5rem",
                padding: "2.5rem",
                borderRadius: "16px",
                border: `1px solid ${accent}30`,
                boxShadow: `inset 0 0 60px ${accent}08, 0 4px 20px rgba(0,0,0,0.08)`,
                animation: "vdCardEntrance 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              }}
            >
              {/* Small hearts on opened card */}
              <HeartIcon size={14} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", color: accent, opacity: 0.5 }} />
              <HeartIcon size={12} style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", color: accent, opacity: 0.4 }} />

              <p style={{ fontSize: "0.8rem", letterSpacing: "0.2em", color: accent, marginBottom: "0.5rem" }}>
                Happy Valentine&apos;s Day
              </p>
              <h2 style={{ fontSize: "1.5rem", color: "#4a1528", fontWeight: 500, marginBottom: "1.5rem" }}>
                {greeting.recipientName}
              </h2>
              <p style={{ color: "#2d1f1a", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                {greeting.message}
              </p>
              {greeting.senderName && (
                <p style={{ marginTop: "1.5rem", color: "#4a1528", fontStyle: "italic" }}>
                  — {greeting.senderName} ♥
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
