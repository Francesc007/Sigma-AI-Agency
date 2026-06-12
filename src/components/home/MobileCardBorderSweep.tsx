"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

/** Recorrido clockwise desde sup. izq.; el hueco del dash oculta al cerrar en sup. izq. */
const PATH_CARD =
  "M 5 2 L 50 2 L 95 2 A 3 3 0 0 1 98 5 L 98 95 A 3 3 0 0 1 95 98 L 5 98 A 3 3 0 0 1 2 95 L 2 5 A 3 3 0 0 1 5 2 Z";

type CometTone = "blue" | "light";

type Props = {
  children: ReactNode;
  roundedClassName: string;
  className?: string;
  /** blue = tarjetas blancas; light = fondos oscuros (cometa blanco) */
  tone?: CometTone;
};

const STROKE: Record<CometTone, string> = {
  blue: "#003594",
  light: "#ffffff",
};

/** Cometa en el borde de la tarjeta (móvil y desktop). Trazo sólido: visible en todo el perímetro. */
export function MobileCardBorderSweep({
  children,
  roundedClassName,
  className = "",
  tone = "blue",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35, margin: "0px 0px -12% 0px" });
  const playClass = inView ? "mobile-fuse-path mobile-fuse-path--play" : "mobile-fuse-path";

  return (
    <div ref={ref} className={`relative ${roundedClassName} ${className}`}>
      {children}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute inset-0 z-[5] size-full overflow-visible ${roundedClassName}`}
        aria-hidden
      >
        <path
          d={PATH_CARD}
          fill="none"
          pathLength={100}
          stroke={STROKE[tone]}
          strokeWidth={0.32}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="nonScalingStroke"
          className={playClass}
        />
      </svg>
    </div>
  );
}
