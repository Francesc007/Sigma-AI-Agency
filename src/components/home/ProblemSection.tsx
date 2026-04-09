"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Target, Zap } from "lucide-react";

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
      aria-labelledby="problem-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#F5F5F5] via-white to-[#F8FAFC]"
        aria-hidden
      />
      {/* Línea lateral izquierda: una sola, más gruesa */}
      <motion.div
        className="absolute left-0 top-1/2 h-1 w-32 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#003594] via-[#003594]/60 to-transparent md:w-52 lg:w-64"
        aria-hidden
        initial={{ scaleX: 0, opacity: 0.5 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "left center" }}
      />
      {/* Línea lateral derecha: una sola, más gruesa */}
      <motion.div
        className="absolute right-0 top-1/2 h-1 w-32 -translate-y-1/2 rounded-full bg-gradient-to-l from-[#869397]/80 via-[#869397]/40 to-transparent md:w-52 lg:w-64"
        aria-hidden
        initial={{ scaleX: 0, opacity: 0.5 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        style={{ transformOrigin: "right center" }}
      />

      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[#003594]/5 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          whileHover={{
            y: -4,
            boxShadow:
              "0 24px 48px -10px rgba(0,53,148,0.2), 0 0 0 1px rgba(0,53,148,0.1), 0 0 40px rgba(0,53,148,0.1)",
          }}
          className="problem-card relative rounded-2xl border border-[#869397]/25 bg-white/90 p-6 shadow-lg shadow-[#003594]/5 backdrop-blur-sm transition-shadow duration-300 md:p-8 md:shadow-xl"
        >
          <motion.div
            className="absolute -left-2 top-6 flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#003594] to-[#002a6b] text-white shadow-lg shadow-[#003594]/30 md:-left-3 md:size-10"
            aria-hidden
            initial={{ scale: 0, rotate: -20 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
          >
            <Target className="size-4 md:size-5" aria-hidden />
          </motion.div>
          <h2
            id="problem-heading"
            className="pr-8 text-xl font-bold tracking-tight text-[#003594] md:pr-10 md:text-2xl lg:text-3xl"
          >
            Tener una página web ya no es suficiente
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-4 text-base leading-relaxed text-[#8695A3] md:text-lg"
          >
            En sectores como{" "}
            <strong className="text-[#003594]">Real Estate y Automotriz</strong>, la mayoría de los sitios funcionan como catálogos estáticos: no capturan datos ni automatizan el seguimiento comercial. El resultado es inventario desactualizado y prospectos que pierden interés por la falta de respuesta oportuna.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-6 flex items-center gap-3 rounded-xl bg-[#003594]/5 px-3 py-2.5 md:inline-flex"
          >
            <Zap className="size-4 shrink-0 text-[#003594]" aria-hidden />
            <p className="text-base font-semibold text-[#003594]">
              Nosotros cerramos esa brecha con soluciones digitales a medida.
            </p>
          </motion.div>
        </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="group relative mt-2 min-h-[220px] overflow-hidden rounded-2xl border border-[#869397]/20 shadow-xl sm:min-h-[260px] lg:mt-0 lg:h-full lg:min-h-0"
          >
            <div className="mobile-image-life absolute inset-0">
              <Image
                src="/tech2.jpg"
                alt="Servicios digitales y automatización web"
                fill
                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                sizes="50vw"
                priority={false}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#003594]/20 via-transparent to-transparent" aria-hidden />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
