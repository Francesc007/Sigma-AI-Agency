"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 text-white scroll-mt-0"
      aria-label="Presentación principal"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 gradient-hero" aria-hidden />
      <div className="absolute inset-0 gradient-hero-overlay" aria-hidden />

      {/* Imagen de fondo más visible */}
      <div className="absolute inset-0 opacity-80" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#003594]/55 via-[#041E42]/45 to-[#003594]/65"
        aria-hidden
      />

      {/* Capa de brillo animado (profundidad) */}
      <div className="hero-glow absolute inset-0" aria-hidden />

      {/* Formas flotantes sutiles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          className="hero-float absolute -left-20 top-1/4 size-72 rounded-full border border-white/10 bg-white/5 blur-2xl"
          animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 top-1/2 size-96 rounded-full border border-white/10 bg-[#869397]/10 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 size-48 rounded-full bg-white/5 blur-xl"
          animate={{ x: [0, 10, 0], y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Sistemas Web y Automatización
          <span className="mt-2 block text-[#869397]">para Sectores de Alto Valor</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-white/95 sm:text-xl md:text-2xl leading-relaxed"
        >
          Creamos herramientas a medida para optimizar catálogos, gestionar activos y captar clientes calificados sin perder tiempo en procesos manuales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-[#003594] shadow-lg hover:bg-[#869397]/90 hover:shadow-xl transition-all"
            asChild
          >
            <a href="#proyectos">Ver Proyectos</a>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="border-2 border-white/80 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white"
            asChild
          >
            <a href="#servicios">Soluciones</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
