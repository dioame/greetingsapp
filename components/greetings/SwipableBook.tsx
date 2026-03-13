"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

const SWIPE_THRESHOLD = 60;
const RESISTANCE = 0.4; // how much drag is reduced at edges
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

export function SwipableBook({ greeting }: { greeting: Greeting }) {
  const [page, setPage] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(400);
  const startX = useRef(0);
  const draggingRef = useRef(false);
  const dragXRef = useRef(0);
  const didDragRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = greeting.design.config as { coverColor?: string; accentColor?: string };
  const coverColor = (config.coverColor as string) || "#1a1a2e";
  const accentColor = (config.accentColor as string) || "#e94560";

  const measureWidth = useCallback(() => {
    if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
  }, []);

  useEffect(() => {
    measureWidth();
    const ro = new ResizeObserver(measureWidth);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measureWidth]);

  const getClientX = (e: React.TouchEvent | React.MouseEvent | TouchEvent | MouseEvent) =>
    "touches" in e ? e.touches[0]?.clientX ?? (e as TouchEvent).changedTouches[0]?.clientX : (e as MouseEvent).clientX;

  const onStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      startX.current = getClientX(e);
      draggingRef.current = true;
      didDragRef.current = false;
      setIsDragging(true);
      setDragX(0);
    },
    []
  );

  const onMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent | TouchEvent | MouseEvent) => {
      if (!draggingRef.current) return;
      const x = getClientX(e);
      let delta = x - startX.current;
      // Resistance at first/last page
      if (page === 0 && delta > 0) delta *= RESISTANCE;
      if (page === 2 && delta < 0) delta *= RESISTANCE;
      if (Math.abs(delta) > 8) didDragRef.current = true;
      dragXRef.current = delta;
      setDragX(delta);
    },
    [page]
  );

  const onEnd = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    const current = dragXRef.current;
    if (current < -SWIPE_THRESHOLD && page < 2) {
      setPage((p) => p + 1);
    } else if (current > SWIPE_THRESHOLD && page > 0) {
      setPage((p) => p - 1);
    }
    setDragX(0);
  }, [page]);

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: TouchEvent | MouseEvent) => onMove(e);
    const handleEnd = () => onEnd();
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleEnd);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    return () => {
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
    };
  }, [isDragging, onMove, onEnd]);

  const translateX = -page * containerWidth + dragX;
  const hintRotate = containerWidth ? (dragX / containerWidth) * 8 : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
        fontFamily: "Georgia, serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sb-book, .sb-glow, .sb-track, .sb-panel { animation: none !important; transition: none !important; }
        }
        @keyframes sbBookEntrance {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sbGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.05); }
        }
        .sb-track {
          will-change: transform;
          touch-action: pan-y pinch-zoom;
        }
        .sb-panel {
          flex-shrink: 0;
          backface-visibility: hidden;
        }
      `}</style>
      <div
        className="sb-glow"
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          animation: "sbGlow 6s ease-in-out infinite",
        }}
      />
      <div
        className="sb-book"
        style={{
          maxWidth: "420px",
          width: "100%",
          perspective: "1200px",
          animation: "sbBookEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          ref={containerRef}
          onTouchStart={onStart}
          onMouseDown={onStart}
          onClick={() => {
            if (!didDragRef.current && page < 2) setPage((p) => p + 1);
            didDragRef.current = false;
          }}
          style={{
            position: "relative",
            minHeight: "480px",
            borderRadius: "8px",
            overflow: "hidden",
            cursor: page < 2 ? (isDragging ? "grabbing" : "grab") : "default",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          <div
            className="sb-track"
            style={{
              display: "flex",
              width: containerWidth * 3,
              minHeight: "480px",
              transform: `translate3d(${translateX}px, 0, 0) rotateY(${hintRotate}deg)`,
              transition: isDragging ? "none" : `transform 0.45s ${SPRING}`,
              transformOrigin: "center center",
            }}
          >
            {/* Page 0: Cover */}
            <div
              className="sb-panel"
              style={{
                width: containerWidth,
                minHeight: "480px",
                background: coverColor,
                borderRadius: "8px",
                boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem", letterSpacing: "0.2em" }}>
                A GREETING FOR
              </div>
              <h1 style={{ fontSize: "2rem", color: "#fff", marginBottom: "1rem", fontWeight: 400 }}>
                {greeting.recipientName}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem" }}>
                Swipe or tap to open
              </p>
              <div style={{ marginTop: "2rem", width: "40px", height: "2px", background: accentColor }} />
            </div>

            {/* Page 1: Message */}
            <div
              className="sb-panel"
              style={{
                width: containerWidth,
                minHeight: "480px",
                background: "linear-gradient(180deg, #2d2d44 0%, #1a1a2e 100%)",
                borderRadius: "8px",
                boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.95)",
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {greeting.message}
              </p>
              {greeting.senderName && (
                <p style={{ marginTop: "2rem", color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
                  — {greeting.senderName}
                </p>
              )}
              <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                Swipe or tap for closing
              </p>
            </div>

            {/* Page 2: Closing */}
            <div
              className="sb-panel"
              style={{
                width: containerWidth,
                minHeight: "480px",
                background: "linear-gradient(180deg, #2d2d44 0%, #1a1a2e 100%)",
                borderRadius: "8px",
                boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
              }}
            >
              <div style={{ width: "48px", height: "3px", background: accentColor, marginBottom: "1.5rem" }} />
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem" }}>
                <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
                  Awesome Greetings
                </Link>
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                Made with care
              </p>
            </div>
          </div>
        </div>
        {/* Page indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "1rem",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === page ? "20px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === page ? accentColor : "rgba(255,255,255,0.25)",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
