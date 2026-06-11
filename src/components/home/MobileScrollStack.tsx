"use client";

import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MobileScrollStackProps = {
  children: ReactNode;
  className?: string;
  desktopClassName?: string;
  /** px desde el top del viewport (debajo del navbar) */
  stickyTopBase?: number;
  /** px extra por carta para efecto baraja */
  stickyTopStep?: number;
};

/**
 * Móvil: cartas sticky que se enciman al hacer scroll.
 * md+: layout normal (grid/flex vía desktopClassName).
 */
export function MobileScrollStack({
  children,
  className,
  desktopClassName = "md:grid md:grid-cols-3 md:gap-8",
  stickyTopBase = 88,
  stickyTopStep = 14,
}: MobileScrollStackProps) {
  const items = Children.toArray(children);

  return (
    <div
      className={cn(
        "relative flex flex-col pb-20 md:pb-0",
        desktopClassName,
        className
      )}
    >
      {items.map((child, index) => (
        <div
          key={index}
          className={cn(
            "sticky w-full md:static",
            index < items.length - 1 && "-mb-24 md:mb-0"
          )}
          style={{
            top: stickyTopBase + index * stickyTopStep,
            zIndex: index + 1,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
