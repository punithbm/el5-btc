"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

type Card = { id: number; src: string; title?: string };

interface SwipeDeckProps {
  cards: Card[];
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SWIPE_THRESHOLD = 120; // px
const VELOCITY_THRESHOLD = 0.6; // px/ms approx from framer velocity

export default function SwipeDeck({ cards, width = "100%", height = 600, className = "" }: SwipeDeckProps) {
  // Keep an endless index that wraps
  const [index, setIndex] = React.useState(0);

  const active = cards[index % cards.length];
  const next1 = cards[(index + 1) % cards.length];
  const next2 = cards[(index + 2) % cards.length];

  // Preload next two images
  React.useEffect(() => {
    [active, next1, next2].forEach((c) => {
      const img = new Image();
      img.src = c.src;
    });
  }, [index, active, next1, next2]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 0, 240], [-12, 0, 12]);
  const likeOpacity = useTransform(x, [40, 160], [0, 1]);
  const nopeOpacity = useTransform(x, [-160, -40], [1, 0]);

  const goNext = React.useCallback(() => setIndex((i) => (i + 1) % cards.length), [cards.length]);

  // Keyboard support
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goNext(); // also advance; deck is one-way
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext]);

  const controlsOut = React.useCallback(
    (dir: number, onDone: () => void) => {
      // Animate the card off-screen with spring physics
      const exitX = dir * window.innerWidth * 1.2;

      // Set the motion value to trigger exit animation
      x.set(exitX);

      // After a brief delay, advance to next card and reset
      setTimeout(() => {
        onDone();
        x.set(0);
      }, 150);
    },
    [x]
  );

  return (
    <div className={`relative mx-auto ${className}`} style={{ width, height, touchAction: "pan-y pinch-zoom" }}>
      {/* Depth cards */}
      <DepthCard card={next2} depth={2} />
      <DepthCard card={next1} depth={1} />

      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={`${active.id}-${index}`}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{
            x,
            rotate,
            touchAction: "none",
          }}
          drag="x"
          dragConstraints={{ left: -400, right: 400 }}
          dragElastic={0.3}
          dragMomentum={false}
          dragPropagation={false}
          whileDrag={{ scale: 1.02, cursor: "grabbing" }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{
            scale: 0.8,
            opacity: 0,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onDragStart={(event) => {
            console.log("Drag started");
            // Prevent scroll during drag
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
          }}
          onDrag={(_, info) => {
            console.log("Dragging:", info.offset.x);
          }}
          onDragEnd={(_, info) => {
            console.log("Drag ended:", info.offset.x, info.velocity.x);
            // Re-enable scroll
            document.body.style.overflow = "";
            document.body.style.touchAction = "";

            const { offset, velocity } = info;
            const swipedFar = Math.abs(offset.x) > SWIPE_THRESHOLD;
            const fastEnough = Math.abs(velocity.x) > VELOCITY_THRESHOLD * 1000;

            if (swipedFar || fastEnough) {
              const dir = offset.x > 0 || velocity.x > 0 ? 1 : -1;
              controlsOut(dir, goNext);
            } else {
              x.set(0);
            }
          }}
          data-swipe-active
        >
          <motion.div className="relative h-full w-full rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 pointer-events-none">
            <img src={active.src} alt={active.title ?? "card"} className="h-full w-full object-cover select-none" draggable={false} onDragStart={(e) => e.preventDefault()} />

            {/* Badges */}
            <motion.div className="absolute top-6 left-6 rounded-lg border-2 border-red-500 bg-white/90 px-4 py-2 text-lg font-bold text-red-500 backdrop-blur-sm pointer-events-none" style={{ opacity: nopeOpacity }}>
              NOPE
            </motion.div>
            <motion.div className="absolute top-6 right-6 rounded-lg border-2 border-green-500 bg-white/90 px-4 py-2 text-lg font-bold text-green-500 backdrop-blur-sm pointer-events-none" style={{ opacity: likeOpacity }}>
              LIKE
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons - desktop only */}
      <div className="pointer-events-none absolute -bottom-16 left-0 right-0 flex items-center justify-center gap-4">
        <button className="pointer-events-auto hidden sm:inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-lg shadow-md hover:bg-gray-50 transition-colors" onClick={() => controlsOut(-1, goNext)} aria-label="Swipe left">
          ←
        </button>
        <button className="pointer-events-auto hidden sm:inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-lg shadow-md hover:bg-gray-50 transition-colors" onClick={() => controlsOut(1, goNext)} aria-label="Swipe right">
          →
        </button>
      </div>
    </div>
  );
}

function DepthCard({ card, depth }: { card: Card; depth: 1 | 2 }) {
  const scale = depth === 1 ? 0.96 : 0.92;
  const y = depth === 1 ? 12 : 24;
  const opacity = depth === 1 ? 0.8 : 0.6;

  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `translateY(${y}px) scale(${scale})`,
        transformOrigin: "center",
        zIndex: 10 - depth,
      }}
      aria-hidden
    >
      <div className="h-full w-full rounded-2xl overflow-hidden bg-gray-100 shadow-lg border border-gray-200">
        <img src={card.src} alt="" className="h-full w-full object-cover" style={{ opacity }} draggable={false} />
      </div>
    </div>
  );
}
