"use client";

import { cn } from "@/lib/utils";

/**
 * Logo Sigma AI Agency.
 * En modo normal: img con logo-azul.png.
 * En modo invert/light: la misma imagen se usa como máscara y se rellena de blanco,
 * así se ve la forma real del logo sin convertirse en un círculo blanco.
 */
export function Logo({
  size = 56,
  showText = true,
  className,
  invert,
  light,
}: {
  size?: number;
  showText?: boolean;
  className?: string;
  invert?: boolean;
  light?: boolean;
}) {
  const isLight = invert || light;

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg"
        style={{ width: size, height: size }}
      >
        {isLight ? (
          <span className="logo-mask-light h-full w-full" aria-hidden />
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
            "text-lg font-bold sm:text-xl md:text-2xl",
            isLight ? "text-white" : "text-[#003594]"
          )}
        >
          Sigma AI Agency
        </span>
      )}
    </span>
  );
}
