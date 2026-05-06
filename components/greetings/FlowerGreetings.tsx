"use client";

import Link from "next/link";
import styles from "./FlowerGreetings.module.css";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { config: Record<string, unknown> };
};

/** Self-contained night garden + SVG blooms (no public/assets HTML/CSS). */
export function FlowerGreetings({ greeting }: { greeting: Greeting }) {
  const config = greeting.design.config as { accentColor?: string; textColor?: string };
  const accent = config.accentColor ?? "#c9a0dc";
  const textColor = config.textColor ?? "#f4f2fb";

  const PETAL_RINGS: ReadonlyArray<{ count: number; rx: number; ry: number; offset: number; opacity: number }> = [
    { count: 18, rx: 34, ry: 18, offset: 18, opacity: 0.92 },
    { count: 14, rx: 30, ry: 16, offset: 14, opacity: 0.92 },
    { count: 10, rx: 24, ry: 13, offset: 10, opacity: 0.92 },
    { count: 7, rx: 18, ry: 10, offset: 6, opacity: 0.95 },
  ];

  const SKY_BLOOMS: ReadonlyArray<{ x: number; y: number; s: number; variant: "A" | "B"; o: number }> = [
    { x: 66, y: 78, s: 0.28, variant: "B", o: 0.18 },
    { x: 128, y: 56, s: 0.24, variant: "A", o: 0.16 },
    { x: 214, y: 74, s: 0.30, variant: "B", o: 0.18 },
    { x: 312, y: 52, s: 0.22, variant: "A", o: 0.14 },
    { x: 402, y: 82, s: 0.28, variant: "B", o: 0.18 },

    { x: 54, y: 148, s: 0.26, variant: "A", o: 0.14 },
    { x: 156, y: 132, s: 0.22, variant: "B", o: 0.14 },
    { x: 256, y: 140, s: 0.26, variant: "A", o: 0.14 },
    { x: 352, y: 126, s: 0.24, variant: "B", o: 0.14 },
    { x: 444, y: 152, s: 0.22, variant: "A", o: 0.12 },

    { x: 96, y: 214, s: 0.22, variant: "B", o: 0.12 },
    { x: 184, y: 224, s: 0.20, variant: "A", o: 0.12 },
    { x: 302, y: 214, s: 0.22, variant: "B", o: 0.12 },
    { x: 410, y: 232, s: 0.20, variant: "A", o: 0.10 },

    { x: 36, y: 266, s: 0.20, variant: "B", o: 0.10 },
    { x: 454, y: 288, s: 0.20, variant: "B", o: 0.10 },
    { x: 28, y: 332, s: 0.18, variant: "A", o: 0.08 },
    { x: 458, y: 344, s: 0.18, variant: "A", o: 0.08 },
  ];

  function FlowerBurst({
    id,
    x,
    y,
    scale,
    petalFill,
    centerR,
    opacity,
  }: {
    id: string;
    x: number;
    y: number;
    scale: number;
    petalFill: string;
    centerR: number;
    opacity?: number;
  }) {
    return (
      <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
        {PETAL_RINGS.map((ring, ringIdx) => (
          <g
            key={`${id}-ring-${ringIdx}`}
            className={styles.petalRing}
            style={
              {
                ["--spinDur" as string]: `${18 + ringIdx * 9}s`,
                ["--spinDelay" as string]: `${-(ringIdx * 0.9)}s`,
                ["--spinDir" as string]: ringIdx % 2 === 0 ? "normal" : "reverse",
              } as React.CSSProperties
            }
          >
            {Array.from({ length: ring.count }, (_, i) => {
              const deg = (360 / ring.count) * i + ringIdx * (360 / (ring.count * 2));
              return (
                <ellipse
                  key={`${id}-p-${ringIdx}-${i}`}
                  cx="0"
                  cy="0"
                  rx={ring.rx}
                  ry={ring.ry}
                  transform={`rotate(${deg}) translate(0 -${ring.offset})`}
                  fill={petalFill}
                  opacity={ring.opacity}
                />
              );
            })}
          </g>
        ))}
        <circle cx="0" cy="0" r={centerR} fill="url(#fgHeart)" opacity="0.98" />
      </g>
    );
  }

  return (
    <div
      className={styles.scene}
      style={{ ["--accent" as string]: accent, color: textColor }}
    >
      <div className={styles.skyGlow} aria-hidden />
      <div className={styles.stars} aria-hidden />

      <div className={styles.bouquetWrap} aria-hidden>
        <svg className={styles.bouquet} viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="fgPetalA" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#f5dfe8" />
              <stop offset="55%" stopColor="#d8899e" />
              <stop offset="100%" stopColor="#a8556c" />
            </radialGradient>
            <radialGradient id="fgPetalB" cx="45%" cy="35%">
              <stop offset="0%" stopColor="#fceef5" />
              <stop offset="50%" stopColor="#e7aec0" />
              <stop offset="100%" stopColor="#b56578" />
            </radialGradient>
            <radialGradient id="fgHeart" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#fffbf5" />
              <stop offset="70%" stopColor="#f0dcc8" />
              <stop offset="100%" stopColor="#d4b896" />
            </radialGradient>
          </defs>

          {/* Sky blooms to fill blank space (kept subtle behind the card) */}
          {SKY_BLOOMS.map((b, idx) => (
            <FlowerBurst
              key={`sky-${idx}`}
              id={`sky-${idx}`}
              x={b.x}
              y={b.y}
              scale={b.s}
              petalFill={b.variant === "A" ? "url(#fgPetalA)" : "url(#fgPetalB)"}
              centerR={12}
              opacity={b.o}
            />
          ))}

          {/* Petal-only bouquet (no stems/leaves) */}
          <FlowerBurst id="left" x={138} y={242} scale={1.05} petalFill="url(#fgPetalB)" centerR={14} />
          <FlowerBurst id="center" x={248} y={202} scale={1.25} petalFill="url(#fgPetalA)" centerR={16} />
          <FlowerBurst id="right" x={362} y={252} scale={0.98} petalFill="url(#fgPetalB)" centerR={12} />

          {/* Extra background blooms for fullness */}
          <FlowerBurst id="back1" x={196} y={274} scale={0.72} petalFill="url(#fgPetalA)" centerR={10} />
          <FlowerBurst id="back2" x={304} y={286} scale={0.68} petalFill="url(#fgPetalB)" centerR={10} />
          <FlowerBurst id="back3" x={88} y={294} scale={0.62} petalFill="url(#fgPetalB)" centerR={9} />

          {/* Accent glow tied to theme */}
          <circle cx="248" cy="220" r="160" fill={accent} opacity="0.06" />
        </svg>
      </div>

      <article className={styles.card}>
        <p className={styles.cardLabel}>A note for you</p>
        <h1 className={styles.cardTitle}>To {greeting.recipientName}</h1>
        <p className={styles.cardMessage}>{greeting.message}</p>
        {greeting.senderName && (
          <p className={styles.cardFrom}>— {greeting.senderName}</p>
        )}
        <p className={styles.cardFooter}>
          Greet with <Link href="/">Awesome Greetings</Link>
        </p>
      </article>
    </div>
  );
}
