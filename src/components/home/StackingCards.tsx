"use client";

import { Children, useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/** Reducción de escala de la carta de atrás por cada carta que la cubre (1.0 → 0.98) */
const SCALE_STEP = 0.02;
/** Reducción de opacidad de la carta de atrás por cada carta que la cubre (1.0 → 0.9) */
const OPACITY_STEP = 0.1;

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
  /* z-index incremental: cada carta nueva se superpone a la anterior */
  const zIndex = index + 1;

  /* Top progresivo: navbar + gap + (index * desfase).
     Carta 1 → 100px, carta 2 → 108px, carta 3 → 116px…
     El borde superior de las cartas anteriores queda siempre visible. */
  const stickyTop = `calc(var(--navbar-height, 88px) + var(--stack-first-gap, 12px) + ${index} * var(--stack-offset, 8px))`;

  /* La carta j cubre a esta mientras progress recorre [(j-1)/total, j/total] */
  const scale = useTransform(scrollYProgress, (progress) => {
    let value = 1;
    for (let j = index + 1; j < total; j++) {
      const t = clamp((progress - (j - 1) / total) / (1 / total), 0, 1);
      value -= t * SCALE_STEP;
    }
    return value;
  });

  const opacity = useTransform(scrollYProgress, (progress) => {
    let value = 1;
    for (let j = index + 1; j < total; j++) {
      const t = clamp((progress - (j - 1) / total) / (1 / total), 0, 1);
      value -= t * OPACITY_STEP;
    }
    return value;
  });

  return (
    <div
      className={cn("sticky w-full", index > 0 && "mt-4")}
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
  /** vh extra al final: tiempo con el mazo completo antes de soltar la sección */
  endSpacerVh?: number;
};

/**
 * Mazo de cartas apiladas (estilo Mercado Pago) para móvil/tablet.
 *
 * Arquitectura:
 * - El contenedor actúa como track de scroll (~1 viewport por carta gracias a
 *   la altura natural de las cartas + endSpacer → ≥200vh con 3 cartas).
 * - Cada carta es sticky con top progresivo (navbar + index * desfase) y
 *   z-index incremental: comienza en su posición original del flujo, sube,
 *   se fija, y la siguiente la cubre casi por completo.
 * - Al fijarse la última, el endSpacer da una pausa y la sección continúa.
 *
 * Requiere que ningún ancestro cree un scroll container
 * (usar overflow-x: clip, nunca hidden — ver globals.css).
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
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {items.map((child, index) => (
        <StackingCard
          key={index}
          index={index}
          total={count}
          scrollYProgress={scrollYProgress}
        >
          {child}
        </StackingCard>
      ))}
      <div style={{ height: `${endSpacerVh}vh` }} aria-hidden />
    </div>
  );
}
