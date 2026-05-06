"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

type BottleConfig = {
  bottleColor?: string;
  labelText?: string;
  accentColor?: string;
  revealImageDataUrl?: string;
};

function makeDefaultSurpriseDataUrl(accentColor: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
  <defs>
    <radialGradient id="g" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.95"/>
      <stop offset="60%" stop-color="${accentColor}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6"/>
    </filter>
  </defs>
  <rect width="320" height="220" fill="transparent"/>
  <g filter="url(#s)" opacity="0.9">
    <circle cx="160" cy="110" r="70" fill="url(#g)"/>
  </g>
  <path d="M160 182c-54-40-92-74-92-116 0-24 19-42 44-42 18 0 34 10 48 26 14-16 30-26 48-26 25 0 44 18 44 42 0 42-38 76-92 116z"
        fill="${accentColor}" opacity="0.92"/>
  <path d="M160 171c-46-34-78-63-78-98 0-17 14-30 32-30 15 0 29 10 46 30 17-20 31-30 46-30 18 0 32 13 32 30 0 35-32 64-78 98z"
        fill="#ffffff" opacity="0.22"/>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(Boolean(mq.matches));
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

export function GreetingsBottle({ greeting }: { greeting: Greeting }) {
  const config = (greeting.design.config ?? {}) as BottleConfig;
  const bottleColor = config.bottleColor || "#1f2937";
  const accentColor = config.accentColor || "#a78bfa";
  const labelText = config.labelText || "SHAKE ME";
  const reducedMotion = usePrefersReducedMotion();

  const [revealed, setRevealed] = useState(false);
  const [shakeHint, setShakeHint] = useState<"shake" | "tap">("shake");

  const revealImageDataUrl = useMemo(() => {
    return config.revealImageDataUrl || makeDefaultSurpriseDataUrl(accentColor);
  }, [config.revealImageDataUrl, accentColor]);

  // Detect if devicemotion is likely available; if not, default hint to tap.
  useEffect(() => {
    if (typeof window === "undefined") return;
    setShakeHint("DeviceMotionEvent" in window ? "shake" : "tap");
  }, []);

  // Shake detection (mobile). If it fires, reveal the hidden content.
  const lastShakeAtRef = useRef<number>(0);
  const shakeScoreRef = useRef<number>(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (revealed) return;
    if (reducedMotion) return;
    if (!("DeviceMotionEvent" in window)) return;

    let mounted = true;

    const handler = (e: DeviceMotionEvent) => {
      if (!mounted) return;
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const x = a.x ?? 0;
      const y = a.y ?? 0;
      const z = a.z ?? 0;

      // crude but robust magnitude check
      const mag = Math.sqrt(x * x + y * y + z * z);
      const now = performance.now();

      // Normalize: typical gravity is ~9.8; spikes above ~15 often indicate a shake.
      if (mag > 15) {
        const dt = now - lastShakeAtRef.current;
        lastShakeAtRef.current = now;

        // Increase score quickly for rapid spikes, decay otherwise.
        if (dt < 250) shakeScoreRef.current += 2;
        else shakeScoreRef.current += 1;

        if (shakeScoreRef.current >= 6) {
          setRevealed(true);
          shakeScoreRef.current = 0;
        }
      } else {
        // gentle decay
        shakeScoreRef.current = Math.max(0, shakeScoreRef.current - 0.05);
      }
    };

    // iOS may require permission; we don't block on it—tap still works.
    const maybeRequestPermission = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AnyDeviceMotionEvent = DeviceMotionEvent as any;
      if (typeof AnyDeviceMotionEvent?.requestPermission === "function") {
        try {
          // Only request on a user gesture; we skip auto-request.
          setShakeHint("tap");
        } catch {
          setShakeHint("tap");
        }
      }
    };

    void maybeRequestPermission();
    window.addEventListener("devicemotion", handler);
    return () => {
      mounted = false;
      window.removeEventListener("devicemotion", handler);
    };
  }, [revealed, reducedMotion]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background:
          "radial-gradient(900px 600px at 50% 30%, rgba(167,139,250,0.15), transparent 60%), linear-gradient(180deg, #0b0610 0%, #07060a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .gb-shake { animation: none !important; }
          .gb-float { animation: none !important; }
        }
        @keyframes gbFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        @keyframes gbShake {
          0% { transform: rotate(0deg) translateX(0); }
          20% { transform: rotate(-2deg) translateX(-2px); }
          40% { transform: rotate(2deg) translateX(2px); }
          60% { transform: rotate(-1deg) translateX(-1px); }
          80% { transform: rotate(1deg) translateX(1px); }
          100% { transform: rotate(0deg) translateX(0); }
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: "520px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.9)", fontSize: "1.75rem" }}>
            For {greeting.recipientName}
          </div>
          <div style={{ marginTop: "0.5rem", color: "rgba(255,255,255,0.55)", fontSize: "0.95rem" }}>
            {revealed
              ? "Message revealed."
              : shakeHint === "shake"
                ? "Shake your phone to reveal the message."
                : "Tap the bottle to reveal the message."}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setRevealed(true)}
          className={revealed ? "gb-float" : "gb-shake"}
          aria-label={revealed ? "Bottle opened" : "Shake to open bottle"}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            cursor: revealed ? "default" : "pointer",
            padding: 0,
            outline: "none",
            animation: revealed ? "gbFloat 2.4s ease-in-out infinite" : "gbShake 1.35s ease-in-out infinite",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              width: "260px",
              height: "420px",
              position: "relative",
              filter: "drop-shadow(0 25px 60px rgba(0,0,0,0.55))",
            }}
          >
            {/* Bottle */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
                width: "180px",
                height: "420px",
                borderRadius: "90px 90px 48px 48px",
                background: `linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02)), ${bottleColor}`,
                border: "1px solid rgba(255,255,255,0.10)",
                overflow: "hidden",
              }}
            >
              {/* Neck */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "10px",
                  transform: "translateX(-50%)",
                  width: "92px",
                  height: "92px",
                  borderRadius: "46px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              />

              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "155px",
                  transform: "translateX(-50%)",
                  width: "132px",
                  padding: "0.75rem 0.6rem",
                  borderRadius: "12px",
                  background: "rgba(0,0,0,0.28)",
                  border: `1px solid rgba(167,139,250,0.35)`,
                  color: "rgba(255,255,255,0.86)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.18em",
                  textAlign: "center",
                }}
              >
                {labelText}
              </div>

              {/* Surprise image revealed by shake/tap */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "220px",
                  transform: "translateX(-50%)",
                  width: "160px",
                  height: "140px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: revealed ? 1 : 0,
                  transition: "opacity 450ms ease",
                }}
              >
                <img
                  src={revealImageDataUrl}
                  alt=""
                  style={{
                    width: "160px",
                    height: "140px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 12px 25px rgba(0,0,0,0.45))",
                  }}
                />
              </div>

              {/* Glass highlight */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "0",
                  left: "18px",
                  width: "36px",
                  height: "100%",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0.02))",
                  transform: "skewX(-8deg)",
                  opacity: 0.55,
                }}
              />
            </div>
          </div>
        </button>

        <div
          style={{
            marginTop: "1.5rem",
            padding: "1.25rem 1.5rem",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          {!revealed ? (
            <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              {shakeHint === "shake" ? "Shake to reveal the message inside the bottle." : "Tap to reveal the message inside the bottle."}
            </p>
          ) : (
            <>
              <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "1.02rem", lineHeight: 1.85, whiteSpace: "pre-wrap", margin: 0 }}>
                {greeting.message}
              </p>
              {greeting.senderName && (
                <p style={{ marginTop: "1.25rem", color: "rgba(255,255,255,0.66)", fontStyle: "italic" }}>
                  — {greeting.senderName}
                </p>
              )}
            </>
          )}
          <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>
            Greet with{" "}
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Awesome Greetings
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

