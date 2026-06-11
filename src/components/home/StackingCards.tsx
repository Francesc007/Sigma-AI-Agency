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
/** Desfase visible entre cartas apiladas (borde superior) */
const STACK_OFFSET = 12;
/** Scroll extra al final del track */
const END_SPACER_VH = 18;

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
  const stickyTop = NAVBAR_TOP + index * STACK_OFFSET;
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
  /** vh de solapamiento entre cartas (scroll track) */
  overlapVh?: number;
};

/**
 * Efecto cartas apiladas (estilo Mercado Pago) en móvil/tablet.
 * Desktop: usar grid aparte (lg+).
 */
export function StackingCards({
  children,
  className,
  overlapVh = 42,
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
      className={cn("relative w-full pb-[18vh]", className)}
      style={{
        minHeight: `calc(${count * overlapVh}vh + ${END_SPACER_VH}vh)`,
      }}
    >
      {items.map((child, index) => (
        <div
          key={index}
          style={
            index < count - 1
              ? { marginBottom: `-${overlapVh}vh` }
              : undefined
          }
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
    </div>
  );
}
