"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    title: "Mercedes Benz – Concesionaria: Sistema de Gestión de unidades y Leads",
    description: "Landing de alto impacto integrada a un dashboard dinámico. Actualización de stock en tiempo real y gestión de reseñas de clientes para prueba social y conversión de ventas.",
    image: "/Mercedes Benz 1.png",
    imageFallback: "/Mercedes Benz.png",
  },
  {
    title: "Módulo de Gestión Inmobiliaria (Concept Demo)",
    description: "Prototipo funcional de catálogo dinámico para desarrollos residenciales y comerciales.",
    image: "/Real Estate.png",
    imageFallback: "/R E 1.png",
  },
  {
    title: "Grupo Frimac: Infraestructura Digital Corporativa",
    description: "Desarrollo de plataforma robusta para la presentación de proyectos de ingeniería y captación de licitaciones. Enfoque en autoridad visual y confianza técnica.",
    image: "/Frimac 11.png",
    imageFallback: "/Frimac.png",
  },
  {
    title: "Grupo Nagasapi: Plataforma de Merchandising y Promocionales Corporativos",
    description: "Sitio optimizado para la exhibición de catálogos promocionales industriales. Estructura diseñada para facilitar la solicitud de cotizaciones por volumen.",
    image: "/Naga.png",
    imageFallback: "/Mock nagasapi.png",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function ProjectImage({ image, imageFallback, alt }: { image: string; imageFallback: string; alt: string }) {
  return (
    <div className="relative flex min-h-[220px] w-full items-center justify-center overflow-hidden bg-[#F5F5F5]">
      <motion.div
        className="flex w-full justify-center"
        whileHover={{ scale: 1.03 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        animate={{ scale: [1, 1.02, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          className="h-auto max-h-[320px] w-full object-contain transition-shadow duration-300"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallback) {
              target.dataset.fallback = "1";
              target.src = imageFallback;
            }
          }}
        />
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="proyectos"
      className="scroll-mt-20 bg-[#F5F5F5] py-20 md:py-28"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="projects-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center text-3xl font-bold text-[#003594] md:text-4xl"
        >
          Proyectos reales, resultados concretos
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-12 grid gap-10 md:grid-cols-2"
        >
          {PROJECTS.map((p) => (
            <motion.article
              key={p.title}
              variants={item}
              className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <ProjectImage
                image={p.image}
                imageFallback={p.imageFallback}
                alt={p.title}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#003594]">{p.title}</h3>
                <p className="mt-2 text-[#8695A3]">{p.description}</p>
                <a
                  href="#ready-to-talk"
                  className="btn-cotizar mt-4 inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-all"
                >
                  Cotizar Proyecto
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
