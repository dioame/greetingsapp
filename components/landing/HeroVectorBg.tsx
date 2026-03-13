"use client";

export function HeroVectorBg() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .hero-vector-float, .hero-vector-draw, .hero-vector-pulse { animation: none !important; }
          .hero-vector-draw { stroke-dashoffset: 0 !important; }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          33% { transform: translate(12px, -8px) scale(1.02); opacity: 0.5; }
          66% { transform: translate(-8px, 6px) scale(0.98); opacity: 0.35; }
        }
        @keyframes heroFloatSlow {
          0%, 100% { transform: translate(0, 0); opacity: 0.25; }
          50% { transform: translate(-15px, -10px); opacity: 0.35; }
        }
        @keyframes heroDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.22; }
        }
      `}</style>
      <div
        aria-hidden
        className="hero-vector-wrap"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          {/* Soft gradient orbs */}
          <ellipse
            cx="20%"
            cy="25%"
            rx="280"
            ry="220"
            fill="url(#heroGrad1)"
            className="hero-vector-float"
            style={{
              animation: "heroFloat 18s ease-in-out infinite",
              transformOrigin: "center",
            }}
          />
          <ellipse
            cx="85%"
            cy="70%"
            rx="240"
            ry="260"
            fill="url(#heroGrad2)"
            className="hero-vector-float"
            style={{
              animation: "heroFloat 22s ease-in-out infinite reverse",
              animationDelay: "-5s",
              transformOrigin: "center",
            }}
          />
          <ellipse
            cx="50%"
            cy="85%"
            rx="200"
            ry="180"
            fill="url(#heroGrad3)"
            className="hero-vector-float"
            style={{
              animation: "heroFloatSlow 25s ease-in-out infinite",
              animationDelay: "-10s",
              transformOrigin: "center",
            }}
          />
          <defs>
            <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c77dff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7b2cbf" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="heroGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c77dff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1a1520" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="heroGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#7b2cbf" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#c77dff" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Animated curved paths */}
          <path
            d="M0 200 Q300 100 600 250 T1200 200"
            stroke="url(#heroLineGrad1)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            className="hero-vector-draw"
            style={{
              animation: "heroDraw 2.5s ease-out 0.5s forwards",
              strokeLinecap: "round",
            }}
          />
          <path
            d="M0 500 Q400 380 800 520 T1200 450"
            stroke="url(#heroLineGrad2)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="1400"
            strokeDashoffset="1400"
            className="hero-vector-draw"
            style={{
              animation: "heroDraw 2.8s ease-out 1s forwards",
              strokeLinecap: "round",
            }}
          />
          <path
            d="M1200 600 Q700 500 200 650 Q0 700 0 800"
            stroke="url(#heroLineGrad1)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            className="hero-vector-draw"
            style={{
              animation: "heroDraw 2.2s ease-out 1.2s forwards",
              strokeLinecap: "round",
            }}
          />
          <defs>
            <linearGradient id="heroLineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c77dff" stopOpacity="0" />
              <stop offset="50%" stopColor="#c77dff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#c77dff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="heroLineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f5f0f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#f5f0f7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f5f0f7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Subtle grid / dots */}
          <g className="hero-vector-pulse" style={{ animation: "heroPulse 4s ease-in-out infinite" }}>
            {[200, 400, 600, 800, 1000].map((x, i) =>
              [150, 350, 550, 750].map((y, j) => (
                <circle
                  key={`${i}-${j}`}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill="#c77dff"
                  fillOpacity="0.2"
                />
              ))
            )}
          </g>
        </svg>
      </div>
    </>
  );
}
