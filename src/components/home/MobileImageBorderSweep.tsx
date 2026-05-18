"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

type Props = {
  children: ReactNode;
  /** Debe coincidir con el borde de la imagen (p. ej. rounded-2xl, rounded-t-xl) */
  roundedClassName: string;
  className?: string;
};

/** Solo móvil (oculto desde `md:`): al entrar en vista, un haz recorre el contorno en sentido horario. */
export function MobileImageBorderSweep({ children, roundedClassName, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.42, margin: "0px 0px -12% 0px" });

  return (
    <div ref={ref} className={`relative ${roundedClassName} ${className}`}>
      {children}
      <span
        aria-hidden
        className={`mobile-image-border-sweep pointer-events-none absolute inset-0 z-[5] ${roundedClassName} md:hidden ${
          inView ? "mobile-image-border-sweep--play" : ""
        }`}
      />
    </div>
  );
}
