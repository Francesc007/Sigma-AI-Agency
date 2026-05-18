"use client";

import { useLayoutEffect, useState, type CSSProperties, type ReactNode } from "react";

/** Estelas verticales (caída recta); detrás del contenido del bloque envuelto. */
const METEOR_LINES: readonly {
  left: string;
  tone: "blue" | "silver";
  durationSec: number;
  delaySec: number;
}[] = [
  { left: "6%", tone: "blue", durationSec: 22, delaySec: 0 },
  { left: "20%", tone: "silver", durationSec: 24, delaySec: 2.1 },
  { left: "34%", tone: "blue", durationSec: 21, delaySec: 0.9 },
  { left: "48%", tone: "silver", durationSec: 23, delaySec: 3.4 },
  { left: "62%", tone: "blue", durationSec: 25, delaySec: 1.5 },
  { left: "74%", tone: "silver", durationSec: 20, delaySec: 4.2 },
  { left: "84%", tone: "blue", durationSec: 26, delaySec: 2.8 },
  { left: "92%", tone: "silver", durationSec: 23, delaySec: 5.5 },
];

type Props = {
  children: ReactNode;
};

/**
 * Capa de estelas entre el final del Hero y el inicio de «Para quién».
 * Debe envolver solo el bloque bajo el Hero (p. ej. Problema + Soluciones + Proyectos):
 * el `top` de la zona es 0 respecto a este contenedor.
 */
export function LandingRisingSparkles({ children }: Props) {
  const [zoneH, setZoneH] = useState<number | null>(null);

  useLayoutEffect(() => {
    const hero = document.getElementById("inicio");
    const forWho = document.getElementById("para-quien-es-esto");
    if (!hero || !forWho) return;

    const update = () => {
      const heroEnd = hero.offsetTop + hero.offsetHeight;
      const forWhoTop = forWho.offsetTop;
      setZoneH(Math.max(0, forWhoTop - heroEnd));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(hero);
    ro.observe(forWho);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="relative">
      {zoneH !== null && zoneH > 0 ? (
        <div
          className="landing-meteor-zone pointer-events-none absolute left-0 right-0 top-0 z-0"
          style={{ height: `${zoneH}px` }}
          aria-hidden
        >
          {METEOR_LINES.map((line, i) => (
            <span
              key={i}
              className={[
                "landing-meteor-line absolute h-[1.5cm] w-[2.5px] rounded-full bg-gradient-to-b shadow-[0_0_8px_rgba(0,53,148,0.35)]",
                line.tone === "blue"
                  ? "from-transparent via-[#003594]/65 to-[#003594]"
                  : "from-transparent via-[#C8CED2]/70 to-[#869397]",
              ].join(" ")}
              style={
                {
                  left: line.left,
                  animationDuration: `${line.durationSec}s`,
                  animationDelay: `${line.delaySec}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
