"use client";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

export function MinimalElegant({ greeting }: { greeting: Greeting }) {
  const config = greeting.design.config as { bgColor?: string; textColor?: string };
  const bgColor = (config.bgColor as string) || "#fafafa";
  const textColor = (config.textColor as string) || "#1a1a1a";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 2rem",
      background: bgColor,
      fontFamily: "'Cormorant Garamond', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) { .me-card, .me-line { animation: none !important; } }
        @keyframes meCardEntrance {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes meLineDraw {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
      <article className="me-card" style={{
        maxWidth: "520px",
        width: "100%",
        animation: "meCardEntrance 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      }}>
        <p style={{ fontSize: "0.85rem", letterSpacing: "0.3em", color: textColor, opacity: 0.6, marginBottom: "0.5rem" }}>
          FOR {greeting.recipientName.toUpperCase()}
        </p>
        <div className="me-line" style={{ width: "48px", height: "1px", background: textColor, opacity: 0.4, marginBottom: "2rem", transformOrigin: "left", animation: "meLineDraw 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both" }} />
        <p style={{
          color: textColor,
          fontSize: "1.35rem",
          lineHeight: 1.9,
          fontWeight: 400,
          whiteSpace: "pre-wrap",
        }}>
          {greeting.message}
        </p>
        {greeting.senderName && (
          <p style={{ marginTop: "2rem", color: textColor, opacity: 0.8, fontStyle: "italic" }}>
            — {greeting.senderName}
          </p>
        )}
        <p style={{ marginTop: "2.5rem", fontSize: "0.75rem", letterSpacing: "0.15em", color: textColor, opacity: 0.5 }}>
          Awesome Greetings By Dioame
        </p>
      </article>
    </div>
  );
}
