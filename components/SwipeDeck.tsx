"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, animate } from "framer-motion";

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

  const goNext = React.useCallback(() => setIndex((i) => (i + 1) % cards.length), [cards.length]);
  const goPrevious = React.useCallback(() => setIndex((i) => (i - 1 + cards.length) % cards.length), [cards.length]);

  // Keyboard support
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrevious();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrevious]);

  const controlsOut = React.useCallback(
    (dir: number, onDone: () => void) => {
      // Animate the card off-screen with spring animation
      const exitX = dir * (window.innerWidth + 100);

      // Use animate function for smooth exit
      animate(x, exitX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }).then(() => {
        // After animation completes, advance to next card
        onDone();
        // Reset position immediately for next card
        x.set(0);
      });
    },
    [x]
  );

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{
        width,
        height,
        touchAction: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
      onTouchStart={(e) => {
        // Prevent default touch behavior that might interfere with drag
        e.stopPropagation();
      }}
    >
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
            zIndex: 20,
          }}
          drag="x"
          dragConstraints={{ left: -400, right: 400 }}
          dragElastic={0.3}
          dragMomentum={false}
          dragPropagation={false}
          whileDrag={{ scale: 1.02, cursor: "grabbing" }}
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{
            scale: 0.8,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 400,
            duration: 0.4,
          }}
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
              // Always advance to next card regardless of swipe direction (like Tinder)
              controlsOut(dir, goNext);
            } else {
              x.set(0);
            }
          }}
          data-swipe-active
        >
          <motion.div className="relative h-full w-full rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100">
            <img src={active.src} alt={active.title ?? "card"} className="h-full w-full object-cover select-none pointer-events-none" draggable={false} onDragStart={(e) => e.preventDefault()} />

            {/* Transparent overlay for touch events */}
            <div className="absolute inset-0 bg-transparent cursor-grab active:cursor-grabbing" style={{ touchAction: "none" }} />

            {/* Tap zones for mobile navigation */}
            <div
              className="absolute left-0 top-0 w-1/3 h-full bg-transparent cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Left tap - going to previous card");
                goPrevious();
              }}
              style={{ touchAction: "manipulation" }}
              aria-label="Previous card"
            />
            <div
              className="absolute right-0 top-0 w-1/3 h-full bg-transparent cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Right tap - going to next card");
                goNext();
              }}
              style={{ touchAction: "manipulation" }}
              aria-label="Next card"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons - desktop only */}
      <div className="pointer-events-none absolute -bottom-16 left-0 right-0 flex items-center justify-center gap-4">
        <button className="pointer-events-auto hidden sm:inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-lg shadow-md hover:bg-gray-50 transition-colors" onClick={() => goPrevious()} aria-label="Previous card">
          ←
        </button>
        <button className="pointer-events-auto hidden sm:inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-lg shadow-md hover:bg-gray-50 transition-colors" onClick={() => goNext()} aria-label="Next card">
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
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{
        transform: `translateY(${y + 5}px) scale(${scale - 0.02})`,
      }}
      animate={{
        transform: `translateY(${y}px) scale(${scale})`,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.5,
      }}
      style={{
        transformOrigin: "center",
        zIndex: 10 - depth,
      }}
      aria-hidden
    >
      <div className="h-full w-full rounded-2xl overflow-hidden bg-gray-100 shadow-lg border border-gray-200 pointer-events-none">
        <img src={card.src} alt="" className="h-full w-full object-cover pointer-events-none" style={{ opacity }} draggable={false} />
      </div>
    </motion.div>
  );
}
