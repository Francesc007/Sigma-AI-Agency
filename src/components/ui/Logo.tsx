"use client";

import { cn } from "@/lib/utils";
import { LogoIcon } from "@/components/ui/LogoIcon";

/**
 * Logo Sigma AI Agency.
 * Usa Logo Azul.png con colores originales en todas las ubicaciones.
 */
export function Logo({
  size = 56,
  showText = true,
  className,
  textSpacing = "normal",
  useZantiqa = false,
  textClassName,
}: {
  size?: number;
  showText?: boolean;
  className?: string;
  textSpacing?: "normal" | "wide";
  useZantiqa?: boolean;
  textClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        textSpacing === "wide" ? "gap-4" : "gap-2",
        className
      )}
    >
      <LogoIcon size={size} />
      {showText && (
        <span
          className={cn(
            "text-lg font-bold sm:text-xl md:text-2xl tracking-wide text-[#003594]",
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
