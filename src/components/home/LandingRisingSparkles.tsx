"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Estelas (~1,35 cm × ~2,5 px) en diagonal hasta «Para quién es esto?» — duraciones por línea en `durationSec`. */
const METEOR_LINES: readonly {
  x0: string;
  x1: string;
  tone: "blue" | "silver";
  durationSec: number;
  delaySec: number;
}[] = [
  { x0: "6%", x1: "13%", tone: "blue", durationSec: 22, delaySec: 0 },
  { x0: "20%", x1: "27%", tone: "silver", durationSec: 24, delaySec: 2.1 },
  { x0: "34%", x1: "43%", tone: "blue", durationSec: 21, delaySec: 0.9 },
  { x0: "48%", x1: "56%", tone: "silver", durationSec: 23, delaySec: 3.4 },
  { x0: "62%", x1: "70%", tone: "blue", durationSec: 25, delaySec: 1.5 },
  { x0: "74%", x1: "81%", tone: "silver", durationSec: 20, delaySec: 4.2 },
  { x0: "84%", x1: "91%", tone: "blue", durationSec: 26, delaySec: 2.8 },
  { x0: "92%", x1: "97%", tone: "silver", durationSec: 23, delaySec: 5.5 },
];

type Props = {
  children: ReactNode;
};

export function LandingRisingSparkles({ children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [zone, setZone] = useState<{ top: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const hero = document.getElementById("inicio");
    const forWho = document.getElementById("para-quien-es-esto");
    if (!root || !hero || !forWho) return;

    const update = () => {
      const heroEnd = hero.offsetTop + hero.offsetHeight;
      const forWhoTop = forWho.offsetTop;
      const height = forWhoTop - heroEnd;
      setZone({ top: heroEnd, height: Math.max(0, height) });
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
    <div ref={rootRef} className="relative">
      {children}
      {zone && zone.height > 0 ? (
        <div
          className="landing-meteor-zone pointer-events-none absolute left-0 right-0 z-[5]"
          style={{ top: `${zone.top}px`, height: `${zone.height}px` }}
          aria-hidden
        >
          {METEOR_LINES.map((line, i) => (
            <span
              key={i}
              className={[
                "landing-meteor-line absolute h-[1.5cm] w-[2.5px] -rotate-[22deg] rounded-full bg-gradient-to-b shadow-[0_0_8px_rgba(0,53,148,0.35)]",
                line.tone === "blue"
                  ? "from-transparent via-[#003594]/65 to-[#003594]"
                  : "from-transparent via-[#C8CED2]/70 to-[#869397]",
              ].join(" ")}
              style={
                {
                  "--meteor-x0": line.x0,
                  "--meteor-x1": line.x1,
                  animationDuration: `${line.durationSec}s`,
                  animationDelay: `${line.delaySec}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
