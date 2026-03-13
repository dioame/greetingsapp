"use client";

import { useId } from "react";

export function SectionDivider() {
  const id = useId();
  const gradientId = `divider-grad-${id.replace(/:/g, "")}`;
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) { .section-divider-line { animation: none !important; } }
        @keyframes sectionDividerFlow {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
      <div style={{ width: "100%", maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem" }}>
        <svg width="100%" height="24" viewBox="0 0 400 24" fill="none" aria-hidden>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#c77dff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#c77dff" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#c77dff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M0 12 L400 12"
            stroke={`url(#${gradientId})`}
            strokeWidth="1"
            strokeDasharray="8 6"
            strokeLinecap="round"
            className="section-divider-line"
            style={{
              animation: "sectionDividerFlow 20s linear infinite",
            }}
          />
        </svg>
      </div>
    </>
  );
}
