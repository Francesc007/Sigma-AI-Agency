"use client";

import { Children, useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/** Altura de track por tarjeta — scroll mientras la anterior queda anclada */
const DEFAULT_CARD_TRACK_VH = 100;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function stickyTopForIndex(index: number) {
  if (index === 0) {
    return "calc(var(--navbar-height) + var(--stack-first-gap, 12px))";
  }
  return `calc(var(--navbar-height) + var(--stack-first-gap, 12px) + ${index} * var(--stack-offset, 8px))`;
}

type StackingCardProps = {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  children: ReactNode;
};

function StackingCard({
  index,
  total,
  scrollYProgress,
  children,
}: StackingCardProps) {
  const isLast = index === total - 1;
  const zIndex = index + 1;

  const scale = useTransform(scrollYProgress, (progress) => {
    if (isLast) return 1;
    let value = 1;
    for (let j = index + 1; j < total; j++) {
      const threshold = j / total;
      const t = clamp((progress - threshold) / (1 / total), 0, 1);
      value -= t * 0.045;
    }
    return Math.max(value, 0.88);
  });

  const opacity = useTransform(scrollYProgress, (progress) => {
    if (isLast) return 1;
    let value = 1;
    for (let j = index + 1; j < total; j++) {
      const threshold = j / total;
      const t = clamp((progress - threshold) / (1 / total), 0, 1);
      value -= t * 0.14;
    }
    return Math.max(value, 0.75);
  });

  return (
    <div className="sticky w-full" style={{ top: stickyTopForIndex(index), zIndex }}>
      <motion.div
        style={{ scale, opacity }}
        className="origin-top will-change-[transform,opacity]"
      >
        {children}
      </motion.div>
    </div>
  );
}

type StackingCardsProps = {
  children: ReactNode;
  className?: string;
  /** vh extra al final para que la última carta salga suave */
  endSpacerVh?: number;
  /** Altura de scroll por carta (vh) — más alto = más tiempo anclada antes del traslape */
  cardTrackVh?: number;
};

/**
 * Efecto cartas apiladas (estilo Mercado Pago) en móvil/tablet.
 * Ancla 1.ª carta en: navbar + --stack-first-gap (ver globals.css).
 * Desktop: usar grid aparte (lg+).
 */
export function StackingCards({
  children,
  className,
  endSpacerVh = 28,
  cardTrackVh = DEFAULT_CARD_TRACK_VH,
}: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const count = items.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (count === 0) return null;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {items.map((child, index) => (
        <div key={index} style={{ minHeight: `${cardTrackVh}vh` }}>
          <StackingCard
            index={index}
            total={count}
            scrollYProgress={scrollYProgress}
          >
            {child}
          </StackingCard>
        </div>
      ))}
      <div style={{ height: `${endSpacerVh}vh` }} aria-hidden />
    </div>
  );
}
