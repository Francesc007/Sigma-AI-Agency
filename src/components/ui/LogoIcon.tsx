"use client";

import Image from "next/image";

/**
 * Logo Sigma AI Agency - colores originales (azul).
 * Sin filtros ni manipulación de color.
 */
export function LogoIcon({
  size = 56,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/Logo Azul.png"
      alt="Sigma AI Agency"
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className ?? ""}`}
      priority
      loading="eager"
      fetchPriority="high"
    />
  );
}
