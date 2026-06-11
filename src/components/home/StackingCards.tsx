"use client";

import { Children, useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/** Altura aproximada del navbar fijo + respiro */
const NAVBAR_TOP = 88;
/** Altura de track por tarjeta para que el sticky se desarrolle */
const CARD_TRACK_VH = 90;
/** Solape entre tracks para que las tarjetas realmente se apilen */
const TRACK_OVERLAP_VH = 22;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
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
  const stickyTop = NAVBAR_TOP;
  const zIndex = index + 1;

  const scale = useTransform(scrollYProgress, (progress) => {
    if (isLast) return 1;
    let value = 1;
    for (let j = index + 1; j < total; j++) {
      const threshold = j / total;
      const t = clamp((progress - threshold) / (1 / total), 0, 1);
      value -= t * 0.035;
    }
    return Math.max(value, 0.9);
  });

  const opacity = useTransform(scrollYProgress, (progress) => {
    if (isLast) return 1;
    let value = 1;
    for (let j = index + 1; j < total; j++) {
      const threshold = j / total;
      const t = clamp((progress - threshold) / (1 / total), 0, 1);
      value -= t * 0.07;
    }
    return Math.max(value, 0.82);
  });

  return (
    <div
      className="sticky w-full"
      style={{ top: stickyTop, zIndex }}
    >
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
};

/**
 * Efecto cartas apiladas (estilo Mercado Pago) en móvil/tablet.
 * Desktop: usar grid aparte (lg+).
 */
export function StackingCards({
  children,
  className,
  endSpacerVh = 28,
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
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
    >
      {items.map((child, index) => (
        <div
          key={index}
          style={{
            minHeight: `${CARD_TRACK_VH}vh`,
            marginTop: index === 0 ? 0 : `-${TRACK_OVERLAP_VH}vh`,
          }}
        >
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
