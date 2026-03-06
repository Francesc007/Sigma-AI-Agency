"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Briefcase,
  FileText,
  Rocket,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Car,
  Briefcase,
  FileText,
  Rocket,
};

export const audienceData = [
  {
    id: 1,
    title: "Automotriz & Inmobiliario",
    icon: "Car",
    description:
      "Concesionarias y Real Estate que buscan automatizar su inventario.",
  },
  {
    id: 2,
    title: "B2B",
    icon: "Briefcase",
    description:
      "Empresas B2B que necesitan catálogos digitales de alta conversión.",
  },
  {
    id: 3,
    title: "Servicios",
    icon: "FileText",
    description:
      "Negocios de servicios que requieren presencia profesional y robusta.",
  },
  {
    id: 4,
    title: "Escalamiento",
    icon: "Rocket",
    description:
      "Emprendedores escalando hacia soluciones personalizadas (No-Code/IA).",
  },
] as const;

const TRANSITION = { duration: 0.45, ease: "easeInOut" as const };

/** Orbit layout: radius, center. 4 positions: top(0), right(1), bottom(2), left(3) */
const ORBIT = {
  radius: 72,
  center: 100,
  iconSize: 52,
};

/** Get x,y for position on circle. Angles: top=-90°, right=0°, bottom=90°, left=180° */
function getOrbitPosition(slotIndex: number) {
  const angles = [-90, 0, 90, 180].map((d) => (d * Math.PI) / 180);
  const angle = angles[slotIndex];
  return {
    x: ORBIT.center + ORBIT.radius * Math.cos(angle),
    y: ORBIT.center + ORBIT.radius * Math.sin(angle),
  };
}

/** Each icon: center if selected, else its fixed orbit slot (0=top, 1=right, 2=bottom, 3=left). */
function useOrbitLayout(activeIndex: number) {
  return useMemo(() => {
    const positions: { x: number; y: number; isCenter: boolean }[] = [];
    for (let i = 0; i < 4; i++) {
      if (i === activeIndex) {
        positions.push({ x: ORBIT.center, y: ORBIT.center, isCenter: true });
      } else {
        const pos = getOrbitPosition(i);
        positions.push({ ...pos, isCenter: false });
      }
    }
    return positions;
  }, [activeIndex]);
}

export function AudienceOrbit() {
  const [activeId, setActiveId] = useState<number>(audienceData[0].id);
  const activeItem =
    audienceData.find((item) => item.id === activeId) ?? audienceData[0];
  const activeIndex = audienceData.findIndex((item) => item.id === activeId);
  const positions = useOrbitLayout(activeIndex);

  return (
    <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-12">
      {/* Left: circular orbit selector (desktop) */}
      <div className="relative flex shrink-0 items-center justify-center lg:w-[280px]">
        <div
          className="relative hidden lg:block"
          style={{
            width: ORBIT.center * 2,
            height: ORBIT.center * 2,
          }}
        >
          {audienceData.map((item, i) => {
            const Icon = ICON_MAP[item.icon];
            const isActive = activeId === item.id;
            const pos = positions[i];

            return (
              <motion.div
                key={item.id}
                className="absolute left-0 top-0 z-10"
                initial={false}
                animate={{
                  x: pos.x - ORBIT.iconSize / 2 - ORBIT.center,
                  y: pos.y - ORBIT.iconSize / 2 - ORBIT.center,
                  scale: isActive ? 1.3 : 0.8,
                  opacity: isActive ? 1 : 0.6,
                  zIndex: isActive ? 20 : 10,
                }}
                transition={{
                  x: TRANSITION,
                  y: TRANSITION,
                  scale: TRANSITION,
                  opacity: TRANSITION,
                }}
                style={{
                  left: ORBIT.center,
                  top: ORBIT.center,
                }}
              >
                <motion.div
                  className="relative flex items-center justify-center"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 -m-6 rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(29,78,216,0.35) 0%, rgba(29,78,216,0.12) 40%, transparent 70%)",
                        filter: "blur(8px)",
                      }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      aria-hidden
                    />
                  )}
                  <motion.button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className="relative flex size-[52px] items-center justify-center rounded-2xl border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8] focus-visible:ring-offset-2"
                    whileHover={{ scale: (isActive ? 1.3 : 0.8) * 1.05 }}
                    style={{
                      boxShadow: isActive
                        ? "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1), 0 0 0 2px white"
                        : "0 1px 3px rgba(0,0,0,0.08)",
                      backgroundColor: isActive ? "#1d4ed8" : "rgba(255,255,255,0.95)",
                      borderColor: isActive ? "#1d4ed8" : "rgba(134,147,151,0.2)",
                      color: isActive ? "white" : "#869397",
                    }}
                    aria-pressed={isActive}
                    aria-label={`Seleccionar: ${item.title}`}
                  >
                    {Icon && <Icon className="size-6" aria-hidden />}
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="flex w-full gap-4 overflow-x-auto pb-2 lg:hidden">
          {audienceData.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const isActive = activeId === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className="flex shrink-0 items-center justify-center rounded-2xl border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8] focus-visible:ring-offset-2"
                initial={false}
                animate={{
                  scale: isActive ? 1.3 : 0.8,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={TRANSITION}
                whileHover={{ scale: (isActive ? 1.3 : 0.8) * 1.05 }}
                style={{
                  width: ORBIT.iconSize,
                  height: ORBIT.iconSize,
                  boxShadow: isActive
                    ? "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)"
                    : "0 1px 3px rgba(0,0,0,0.08)",
                  backgroundColor: isActive ? "#1d4ed8" : "rgba(255,255,255,0.95)",
                  borderColor: isActive ? "#1d4ed8" : "rgba(134,147,151,0.2)",
                  color: isActive ? "white" : "#869397",
                }}
                aria-pressed={isActive}
                aria-label={`Seleccionar: ${item.title}`}
              >
                {Icon && <Icon className="size-6" aria-hidden />}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right: content panel - max 420px, vertically centered with orbit */}
      <div className="flex min-h-[140px] w-full max-w-[420px] flex-1 items-center lg:max-w-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={TRANSITION}
            className="w-full rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold tracking-tight text-[#003594] md:text-xl">
              {activeItem.title}
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...TRANSITION, delay: 0.06 }}
              className="mt-3 text-sm leading-relaxed text-[#8695A3] md:text-base"
            >
              {activeItem.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
