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

const transition = { duration: 0.4, ease: [0.33, 0.66, 0.33, 1] as const };

/** Quadratic Bezier point: B(t) = (1-t)²P0 + 2(1-t)t*P1 + t²*P2 */
function pointOnQuad(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

const CURVE = {
  width: 140,
  height: 280,
  /** Control point offset so the line bulges right in the middle */
  bulge: 28,
};
const NUM_SLOTS = 7;
const ICON_SIZE = 56;

/** Path points for the vertical curve (desktop). Selected icon index maps to center slot. */
function useCurvePositions(activeIndex: number) {
  return useMemo(() => {
    const { width, height, bulge } = CURVE;
    const cx = width / 2 + bulge;
    const p0 = { x: width / 2, y: 12 };
    const p1 = { x: cx, y: height / 2 };
    const p2 = { x: width / 2, y: height - 12 };
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < NUM_SLOTS; i++) {
      const t = i / (NUM_SLOTS - 1);
      points.push(pointOnQuad(t, p0, p1, p2));
    }
    const centerSlot = Math.floor((NUM_SLOTS - 1) / 2);
    const positions = audienceData.map((_, i) => {
      const slot = centerSlot - activeIndex + i;
      const clamped = Math.max(0, Math.min(slot, NUM_SLOTS - 1));
      return points[clamped];
    });
    return { positions };
  }, [activeIndex]);
}

/** SVG path d for the same quadratic curve */
function getCurvePathD() {
  const { width, height, bulge } = CURVE;
  const cx = width / 2 + bulge;
  const x0 = width / 2;
  return `M ${x0} 12 Q ${cx} ${height / 2} ${x0} ${height - 12}`;
}

export function AudienceSelector() {
  const [activeId, setActiveId] = useState<number>(audienceData[0].id);
  const activeItem = audienceData.find((item) => item.id === activeId) ?? audienceData[0];
  const activeIndex = audienceData.findIndex((item) => item.id === activeId);
  const { positions } = useCurvePositions(activeIndex);

  return (
    <div className="flex w-full flex-col gap-10 lg:flex-row lg:gap-12">
      {/* Left: curved timeline (desktop) / horizontal scroll (mobile) */}
      <div className="relative flex shrink-0 lg:w-[30%]">
        {/* Desktop: curved path + icons along curve */}
        <div className="hidden overflow-visible lg:block" style={{ width: CURVE.width, minHeight: CURVE.height }}>
          <svg
            className="absolute left-0 top-0 overflow-visible"
            width={CURVE.width}
            height={CURVE.height}
            aria-hidden
          >
            <defs>
              <linearGradient id="audience-curve-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#003594" stopOpacity={0.25} />
                <stop offset="50%" stopColor="#003594" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#003594" stopOpacity={0.25} />
              </linearGradient>
            </defs>
            <path
              d={getCurvePathD()}
              fill="none"
              stroke="url(#audience-curve-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            />
          </svg>
          <div className="relative" style={{ width: CURVE.width, height: CURVE.height }}>
            {audienceData.map((item, i) => {
              const Icon = ICON_MAP[item.icon];
              const isActive = activeId === item.id;
              const pos = positions[i];
              const offsetX = isActive ? 16 : 0;
              const offsetY = isActive ? 0 : 0;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className="absolute z-10 flex shrink-0 items-center justify-center rounded-2xl border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003594] focus-visible:ring-offset-2"
                  initial={false}
                  animate={{
                    left: pos.x - ICON_SIZE / 2 + offsetX,
                    top: pos.y - ICON_SIZE / 2 + offsetY,
                    scale: isActive ? 1.2 : 0.9,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{
                    left: transition,
                    top: transition,
                    scale: transition,
                    opacity: transition,
                  }}
                  style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    boxShadow: isActive
                      ? "0 0 0 2px white, 0 0 20px rgba(0,53,148,0.4), 0 10px 25px -5px rgba(0,53,148,0.2)"
                      : "0 1px 3px rgba(0,0,0,0.08)",
                    backgroundColor: isActive ? "#003594" : "rgba(255,255,255,0.9)",
                    borderColor: isActive ? "#003594" : "rgba(134,147,151,0.25)",
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

        {/* Mobile: horizontal scroll, no curve */}
        <div className="flex w-full gap-4 overflow-x-auto pb-2 lg:hidden">
          {audienceData.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const isActive = activeId === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className="relative z-10 flex shrink-0 items-center justify-center rounded-2xl border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003594] focus-visible:ring-offset-2"
                initial={false}
                animate={{
                  scale: isActive ? 1.2 : 0.9,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={transition}
                style={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  boxShadow: isActive
                    ? "0 0 0 2px white, 0 0 20px rgba(0,53,148,0.4), 0 10px 25px -5px rgba(0,53,148,0.2)"
                    : "0 1px 3px rgba(0,0,0,0.08)",
                  backgroundColor: isActive ? "#003594" : "rgba(255,255,255,0.9)",
                  borderColor: isActive ? "#003594" : "rgba(134,147,151,0.25)",
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

      {/* Right: dynamic content panel */}
      <div className="min-h-[180px] flex-1 lg:w-[70%] lg:pl-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={transition}
            className="rounded-2xl border border-[#869397]/20 bg-white/95 p-6 shadow-[0_4px_24px_rgba(0,53,148,0.08)] backdrop-blur-sm md:p-8"
          >
            <h3 className="text-xl font-bold tracking-tight text-[#003594] md:text-2xl">
              {activeItem.title}
            </h3>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.08 }}
              className="mt-4 text-base leading-relaxed text-[#8695A3] md:text-lg"
            >
              {activeItem.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
