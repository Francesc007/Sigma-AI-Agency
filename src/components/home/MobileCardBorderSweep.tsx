"use client";

import { useId, useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

const PATH_CARD =
  "M 50 2 L 95 2 A 3 3 0 0 1 98 5 L 98 95 A 3 3 0 0 1 95 98 L 5 98 A 3 3 0 0 1 2 95 L 2 5 A 3 3 0 0 1 5 2 L 50 2 Z";

type Props = {
  children: ReactNode;
  roundedClassName: string;
  className?: string;
};

/** Solo móvil: mecha en el borde de la tarjeta; ciclo con pausa de 1s al completar. */
export function MobileCardBorderSweep({ children, roundedClassName, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const safeId = useId().replace(/:/g, "");
  const inView = useInView(ref, { once: true, amount: 0.35, margin: "0px 0px -12% 0px" });

  return (
    <div ref={ref} className={`relative ${roundedClassName} ${className}`}>
      {children}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute inset-0 z-[5] size-full overflow-visible md:hidden ${roundedClassName}`}
        aria-hidden
      >
        <defs>
          <linearGradient id={`mobile-fuse-grad-${safeId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003594" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#869397" stopOpacity="0.85" />
          </linearGradient>
          <filter
            id={`mobile-fuse-glow-${safeId}`}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.45" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={PATH_CARD}
          fill="none"
          pathLength={100}
          stroke={`url(#mobile-fuse-grad-${safeId})`}
          strokeWidth={1.15}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="nonScalingStroke"
          className={inView ? "mobile-fuse-path mobile-fuse-path--play" : "mobile-fuse-path"}
          filter={`url(#mobile-fuse-glow-${safeId})`}
        />
      </svg>
    </div>
  );
}
