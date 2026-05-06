"use client";

import { SwipableBook } from "@/components/greetings/SwipableBook";
import { CardFlip } from "@/components/greetings/CardFlip";
import { RevealUnveil } from "@/components/greetings/RevealUnveil";
import { ConfettiBurst } from "@/components/greetings/ConfettiBurst";
import { MinimalElegant } from "@/components/greetings/MinimalElegant";
import { PhotoFrame } from "@/components/greetings/PhotoFrame";
import { Typewriter } from "@/components/greetings/Typewriter";
import { ValentineDay } from "@/components/greetings/ValentineDay";
import { MothersDay } from "@/components/greetings/MothersDay";
import { FathersDay } from "@/components/greetings/FathersDay";
import { WomensMonth } from "@/components/greetings/WomensMonth";
import { ChristmasDay } from "@/components/greetings/ChristmasDay";
import { FlowerGreetings } from "@/components/greetings/FlowerGreetings";
import { GreetingsBottle } from "@/components/greetings/GreetingsBottle";

type Greeting = {
  recipientName: string;
  senderName: string | null;
  message: string;
  design: { slug: string; type: string; config: Record<string, unknown> };
};

const designMap: Record<string, React.ComponentType<{ greeting: Greeting }>> = {
  swipable_book: SwipableBook,
  card_flip: CardFlip,
  reveal_unveil: RevealUnveil,
  confetti_burst: ConfettiBurst,
  minimal_elegant: MinimalElegant,
  photo_frame: PhotoFrame,
  typewriter: Typewriter,
  valentines_day: ValentineDay,
  mothers_day: MothersDay,
  fathers_day: FathersDay,
  womens_month: WomensMonth,
  christmas_day: ChristmasDay,
  flower_greetings: FlowerGreetings,
  greetings_bottle: GreetingsBottle,
};

export function GreetingView({ greeting }: { greeting: Greeting }) {
  const Component = designMap[greeting.design.type] ?? MinimalElegant;
  return (
    <main style={{ minHeight: "100vh", background: "#0c0a0f" }}>
      <Component greeting={greeting} />
    </main>
  );
}
