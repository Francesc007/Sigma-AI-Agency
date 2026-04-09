"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HERO_VIDEO_SRC = "/SIGMA%20AI%20HERO1.mp4";

export function Hero() {
  return (
    <section
      id="inicio"
      data-cursor-zone="dark"
      className="relative flex min-h-[100vh] flex-col items-start justify-center overflow-hidden px-4 pt-24 pb-16 text-white scroll-mt-0"
      aria-label="Presentación principal"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 gradient-hero" aria-hidden />
      <div className="absolute inset-0 gradient-hero-overlay" aria-hidden />

      {/* Video a todo el ancho: mismo difuminado que el carrusel anterior */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="hero-carousel-images-mask relative h-full w-full">
          <div className="mobile-image-life absolute inset-0 h-full w-full">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#003594]/35 via-[#041E42]/25 to-[#003594]/40"
        aria-hidden
      />

      {/* Capa de brillo animado (profundidad) */}
      <div className="hero-glow absolute inset-0" aria-hidden />

      {/* Resplandor que recorre todo el hero (incluyendo texto izquierdo) */}
      <div className="hero-image-shine pointer-events-none absolute inset-0 z-[5]" aria-hidden />

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

      <div className="relative z-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Sistemas Web y Automatización
            <span className="mt-2 block text-[#b8c2c6]">para Sectores de Alto Valor</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 max-w-xl text-lg text-white/95 sm:text-xl md:text-2xl leading-relaxed"
          >
            Creamos herramientas a medida para optimizar catálogos, gestionar activos y captar clientes calificados sin perder tiempo en procesos manuales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 flex w-full max-w-md flex-col flex-wrap items-stretch gap-4 sm:max-w-none sm:flex-row sm:items-center"
          >
          <Button
            variant="primary"
            size="lg"
            className="w-full bg-[#b8c2c6] text-[#003594] shadow-lg hover:bg-[#9ca8ac] hover:text-[#003594] hover:shadow-xl transition-all sm:w-auto"
            asChild
          >
            <a href="#proyectos">Ver Proyectos</a>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full border-2 border-white/80 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white sm:w-auto"
            asChild
          >
            <a href="#servicios">Soluciones</a>
          </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
