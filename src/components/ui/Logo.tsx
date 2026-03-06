"use client";

import { cn } from "@/lib/utils";

/**
 * Logo Sigma AI Agency.
 * - variant="blue": img /logo-azul.png (fondo claro).
 * - variant="white": máscara CSS sobre logo-azul.png rellena de blanco (fondo oscuro).
 *   Así se ve la forma correcta del logo al recargar, sin depender de logo-blanco.png ni de filter.
 */
export function Logo({
  size = 56,
  showText = true,
  className,
  variant = "blue",
  /** Más espacio entre ícono y texto (ej. en navbar) */
  textSpacing = "normal",
  /** Aplicar fuente Zantiqa solo al texto "Sigma AI Agency" */
  useZantiqa = false,
  /** Clase extra para el texto (por ejemplo, color personalizado) */
  textClassName,
}: {
  size?: number;
  showText?: boolean;
  className?: string;
  variant?: "blue" | "white";
  textSpacing?: "normal" | "wide";
  useZantiqa?: boolean;
  textClassName?: string;
}) {
  const isWhite = variant === "white";

  return (
    <span
      className={cn(
        "inline-flex items-center",
        textSpacing === "wide" ? "gap-4" : "gap-2",
        className
      )}
    >
      <span
        className="relative flex shrink-0 items-center justify-center"
        style={{ width: size, height: size }}
      >
        {isWhite ? (
          <span
            className="logo-mask-light h-full w-full"
            aria-hidden
          />
        ) : (
          <img
            src="/logo-azul.png"
            alt="Sigma AI Agency"
            width={size}
            height={size}
            className="h-full w-full object-contain"
            loading="eager"
            fetchPriority="high"
          />
        )}
      </span>
      {showText && (
        <span
          className={cn(
            "text-lg font-bold sm:text-xl md:text-2xl tracking-wide",
            isWhite ? "text-white" : "text-[#003594]",
            useZantiqa && "font-zantiqa",
            textClassName
          )}
        >
          SIGMA AI AGENCY
        </span>
      )}
    </span>
  );
}
