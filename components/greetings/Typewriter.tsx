"use client";

import { useState, useEffect } from "react";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

export function Typewriter({ greeting }: { greeting: Greeting }) {
  const [display, setDisplay] = useState("");
  const full = greeting.message;
  const config = greeting.design.config as { paperColor?: string; inkColor?: string };
  const paperColor = (config.paperColor as string) || "#f4e4bc";
  const inkColor = (config.inkColor as string) || "#2c1810";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i <= full.length) {
        setDisplay(full.slice(0, i));
        i++;
      } else clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [full]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(180deg, #2d2a26 0%, #1a1816 100%)",
      fontFamily: "'Cormorant Garamond', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) { .tw-card { animation: none !important; } }
        @keyframes twCardEntrance {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
      <div className="tw-card" style={{
        maxWidth: "480px",
        width: "100%",
        padding: "2.5rem 2rem",
        background: paperColor,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(0,0,0,0.05)",
        borderRadius: "4px",
        border: "1px solid rgba(0,0,0,0.08)",
        animation: "twCardEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      }}>
        <p style={{ fontSize: "0.85rem", letterSpacing: "0.15em", color: inkColor, opacity: 0.7, marginBottom: "0.5rem" }}>
          To {greeting.recipientName}
        </p>
        <p style={{
          color: inkColor,
          fontSize: "1.2rem",
          lineHeight: 1.85,
          minHeight: "4em",
          whiteSpace: "pre-wrap",
        }}>
          {display}
          <span style={{ animation: "blink 1s step-end infinite" }}>|</span>
        </p>
        {display.length >= full.length && greeting.senderName && (
          <p style={{ marginTop: "1rem", color: inkColor, opacity: 0.8, fontStyle: "italic" }}>
            — {greeting.senderName}
          </p>
        )}
        {display.length >= full.length && (
          <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: inkColor, opacity: 0.5 }}>
            Awesome Greetings By Dioame
          </p>
        )}
      </div>
    </div>
  );
}
