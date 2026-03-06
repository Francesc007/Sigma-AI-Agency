"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

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
      {/* Líneas laterales más largas y dinámicas */}
      <motion.div
        className="absolute left-0 top-1/2 h-0.5 w-32 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#003594] via-[#003594]/60 to-transparent md:w-52 lg:w-64"
        aria-hidden
        initial={{ scaleX: 0, opacity: 0.5 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "left center" }}
      />
      <motion.div
        className="absolute right-0 top-1/2 h-0.5 w-32 -translate-y-1/2 rounded-full bg-gradient-to-l from-[#869397]/80 via-[#869397]/40 to-transparent md:w-52 lg:w-64"
        aria-hidden
        initial={{ scaleX: 0, opacity: 0.5 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        style={{ transformOrigin: "right center" }}
      />

      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[#003594]/5 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,53,148,0.15), 0 0 0 1px rgba(135,147,151,0.1)" }}
          className="problem-card relative rounded-2xl border border-[#869397]/25 bg-white/90 p-8 shadow-lg shadow-[#003594]/5 backdrop-blur-sm transition-shadow duration-300 md:p-12 md:shadow-xl"
        >
          <motion.div
            className="absolute -left-2 top-8 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#003594] to-[#002a6b] text-white shadow-lg shadow-[#003594]/30 md:-left-3 md:size-12"
            aria-hidden
            initial={{ scale: 0, rotate: -20 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
          >
            <Sparkles className="size-5 md:size-6" aria-hidden />
          </motion.div>
          <h2
            id="problem-heading"
            className="pr-8 text-2xl font-bold tracking-tight text-[#003594] md:pr-12 md:text-3xl lg:text-4xl"
          >
            Tener una página web ya no es suficiente
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-6 text-lg leading-relaxed text-[#8695A3] md:text-xl"
          >
            La mayoría de los sitios en sectores como{" "}
            <strong className="text-[#003594]">Real Estate o Automotriz</strong> son solo catálogos estáticos que no capturan datos ni automatizan el seguimiento. El resultado es inventario desactualizado y clientes que se enfrían por falta de respuesta inmediata.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-8 flex items-center gap-3 rounded-xl bg-[#003594]/5 px-4 py-3 md:inline-flex"
          >
            <Zap className="size-5 shrink-0 text-[#003594]" aria-hidden />
            <p className="text-lg font-semibold text-[#003594]">
              Nosotros cerramos esa brecha.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
