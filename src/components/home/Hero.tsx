"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HERO_CAROUSEL_IMAGES = [
  // 1) Sigma AI (más cerca ~15%)
  { src: "/sigma-ai.png", alt: "", scale: "scale-100" },
  // 2) Vibe Coding
  { src: "/Vibe Coding.jpg", alt: "", scale: "" },
  // 3) Tech
  { src: "/tech.jpg", alt: "", scale: "" },
  // 4) Logo Azul (más lejos ~35%)
  { src: "/Logo Azul.png", alt: "", scale: "scale-[0.50]" },
];
const HERO_CAROUSEL_INTERVAL_MS = 4000;
const HERO_FADE_DURATION = 0.8;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_CAROUSEL_IMAGES.length);
    }, HERO_CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100vh] flex-col items-start justify-center overflow-hidden px-4 pt-24 pb-16 text-white scroll-mt-0"
      aria-label="Presentación principal"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 gradient-hero" aria-hidden />
      <div className="absolute inset-0 gradient-hero-overlay" aria-hidden />

      {/* Carrusel cross-fade: imágenes apiladas, solo opacity animada */}
      <div
        className="absolute right-0 top-0 flex h-full min-w-[50%] max-w-[65%] items-center justify-center overflow-hidden md:max-w-[55%]"
        aria-hidden
      >
        <div className="relative h-full w-full overflow-hidden">
          {HERO_CAROUSEL_IMAGES.map((img, idx) => (
            <motion.div
              key={`${img.src}-${idx}`}
              className={`absolute inset-0 flex items-center justify-center ${img.scale}`}
              initial={false}
              animate={{ opacity: idx === activeIndex ? 1 : 0 }}
              transition={{ duration: HERO_FADE_DURATION, ease: "easeInOut" }}
              aria-hidden={idx !== activeIndex}
            >
              <Image
                src={img.src}
                alt={img.alt || "sigma-ai.png"}
                fill
                className="object-contain object-center"
                priority={idx === 0}
                loading={idx === 0 ? "eager" : "lazy"}
                quality={90}
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </motion.div>
          ))}
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
            className="mt-10 flex flex-wrap items-center gap-4"
          >
          <Button
            variant="primary"
            size="lg"
            className="bg-[#b8c2c6] text-[#003594] shadow-lg hover:bg-[#9ca8ac] hover:text-[#003594] hover:shadow-xl transition-all"
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
      </div>
    </section>
  );
}
