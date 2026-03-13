import { join } from "path";
import { config } from "dotenv";
import { createClient } from "@libsql/client";

config({ path: join(process.cwd(), ".env.local") });

const url = process.env.TURSO_DATABASE_URL ?? "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;
const client = createClient({ url, authToken: authToken || undefined });

const designs = [
  {
    id: "design-swipable-book",
    slug: "swipable-book",
    name: "Swipable Book",
    description: "Turn pages like a real book to reveal your message.",
    design_type: "swipable_book",
    config_json: JSON.stringify({
      theme: "warm",
      coverColor: "#1a1a2e",
      accentColor: "#e94560",
      fontFamily: "Georgia",
    }),
  },
  {
    id: "design-card-flip",
    slug: "card-flip",
    name: "Card Flip",
    description: "Elegant card that flips to reveal the greeting.",
    design_type: "card_flip",
    config_json: JSON.stringify({
      theme: "elegant",
      backColor: "#16213e",
      frontColor: "#0f3460",
      accent: "#e94560",
    }),
  },
  {
    id: "design-reveal-unveil",
    slug: "reveal-unveil",
    name: "Reveal & Unveil",
    description: "Curtain or veil lifts to reveal your message.",
    design_type: "reveal_unveil",
    config_json: JSON.stringify({
      theme: "dramatic",
      curtainColor: "#1a1a2e",
      revealBg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    }),
  },
  {
    id: "design-confetti-burst",
    slug: "confetti-burst",
    name: "Confetti Burst",
    description: "Celebratory confetti reveals the greeting.",
    design_type: "confetti_burst",
    config_json: JSON.stringify({
      theme: "celebration",
      primaryColor: "#ff6b6b",
      secondaryColor: "#4ecdc4",
      tertiaryColor: "#ffe66d",
    }),
  },
  {
    id: "design-minimal-elegant",
    slug: "minimal-elegant",
    name: "Minimal Elegant",
    description: "Clean, typography-focused design.",
    design_type: "minimal_elegant",
    config_json: JSON.stringify({
      theme: "minimal",
      bgColor: "#fafafa",
      textColor: "#1a1a1a",
      accentColor: "#2d3436",
    }),
  },
  {
    id: "design-photo-frame",
    slug: "photo-frame",
    name: "Photo Frame",
    description: "Your message inside a beautiful frame.",
    design_type: "photo_frame",
    config_json: JSON.stringify({
      theme: "classic",
      frameStyle: "wood",
      matColor: "#f5f5dc",
    }),
  },
  {
    id: "design-typewriter",
    slug: "typewriter",
    name: "Typewriter",
    description: "Message appears as if being typed in real time.",
    design_type: "typewriter",
    config_json: JSON.stringify({
      theme: "retro",
      paperColor: "#f4e4bc",
      inkColor: "#2c1810",
    }),
  },
  // ——— Occasion templates ———
  {
    id: "design-valentines-day",
    slug: "valentines-day",
    name: "Valentine's Day",
    description: "Love-themed card for Valentine's Day.",
    design_type: "valentines_day",
    config_json: JSON.stringify({
      theme: "valentines",
      backColor: "#1a0a12",
      frontColor: "#2d1520",
      accent: "#e91e63",
      bgColor: "#fff5f7",
      textColor: "#4a1528",
    }),
  },
  {
    id: "design-mothers-day",
    slug: "mothers-day",
    name: "Mother's Day",
    description: "Warm, floral design to celebrate Mom.",
    design_type: "mothers_day",
    config_json: JSON.stringify({
      theme: "mothers-day",
      bgColor: "#fdf8f3",
      textColor: "#2d1f1a",
      accentColor: "#c75b6b",
    }),
  },
  {
    id: "design-fathers-day",
    slug: "fathers-day",
    name: "Father's Day",
    description: "Classic design for Father's Day.",
    design_type: "fathers_day",
    config_json: JSON.stringify({
      theme: "fathers-day",
      paperColor: "#f0ebe3",
      inkColor: "#1e3a5f",
    }),
  },
  {
    id: "design-womens-month",
    slug: "womens-month",
    name: "Women's Month",
    description: "Celebrate Women's History Month.",
    design_type: "womens_month",
    config_json: JSON.stringify({
      theme: "womens-month",
      curtainColor: "#1a0d1f",
      revealBg: "linear-gradient(135deg, #2d1b3d 0%, #4a2c5e 50%, #1a0d1f 100%)",
    }),
  },
  {
    id: "design-christmas-day",
    slug: "christmas-day",
    name: "Christmas Day",
    description: "Festive holiday greeting.",
    design_type: "christmas_day",
    config_json: JSON.stringify({
      theme: "christmas",
      primaryColor: "#c41e3a",
      secondaryColor: "#165b33",
      tertiaryColor: "#e8d5b7",
    }),
  },
];

async function main() {
  for (const d of designs) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO greeting_designs (id, slug, name, description, design_type, config_json)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [d.id, d.slug, d.name, d.description, d.design_type, d.config_json],
    });
    console.log("Seeded design:", d.slug);
  }
  console.log("Greeting designs and template library (occasions) seeded.");
}

main().catch(console.error).finally(() => process.exit(0));
