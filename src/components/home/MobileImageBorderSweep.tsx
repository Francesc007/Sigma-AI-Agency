"use client";

import { useId, useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

/** Perímetro con inicio en el centro superior (como mecha encendida arriba). viewBox 0 0 100 100 */
const PATH_FULL_ROUNDED =
  "M 50 2 L 95 2 A 3 3 0 0 1 98 5 L 98 95 A 3 3 0 0 1 95 98 L 5 98 A 3 3 0 0 1 2 95 L 2 5 A 3 3 0 0 1 5 2 L 50 2 Z";

/** Solo esquinas superiores redondeadas (tarjetas proyecto) */
const PATH_TOP_ROUNDED =
  "M 50 2 L 95 2 A 3 3 0 0 1 98 5 L 98 98 L 2 98 L 2 5 A 3 3 0 0 1 5 2 L 50 2 Z";

type FuseShape = "full" | "top-only";

type Props = {
  children: ReactNode;
  /** Debe coincidir con el borde del marco de la imagen */
  roundedClassName: string;
  className?: string;
  /** `full` = marco rounded-2xl; `top-only` = solo superior (rounded-t-xl) */
  fuseShape?: FuseShape;
};

/**
 * Solo móvil (oculto desde `md:`): al entrar en vista, una “mecha” recorre el borde
 * del marco (no la tarjeta entera), empezando arriba y siguiendo el perímetro.
 */
export function MobileImageBorderSweep({
  children,
  roundedClassName,
  className = "",
  fuseShape = "full",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const safeId = useId().replace(/:/g, "");
  const inView = useInView(ref, { once: true, amount: 0.42, margin: "0px 0px -12% 0px" });

  const d = fuseShape === "top-only" ? PATH_TOP_ROUNDED : PATH_FULL_ROUNDED;

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
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={d}
          fill="none"
          pathLength={100}
          stroke={`url(#mobile-fuse-grad-${safeId})`}
          strokeWidth={2}
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
