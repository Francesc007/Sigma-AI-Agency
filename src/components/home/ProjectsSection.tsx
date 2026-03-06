"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const FADE_DURATION = 0.8;
const CAROUSEL_INTERVAL_MS = 4000;

type Project = {
  title: string;
  description: string;
  image: string;
  imageFallback: string;
  gallery?: string[];
};

const PROJECTS: Project[] = [
  {
    title: "Mercedes Benz – Concesionaria: Sistema de Gestión de unidades y Leads",
    description: "Landing de alto impacto integrada a un dashboard dinámico. Actualización de stock en tiempo real y gestión de reseñas de clientes para prueba social y conversión de ventas.",
    image: "/Meche.png",
    imageFallback: "/Mercedes Benz.png",
    gallery: ["/Meche.png", "/Meche1.png", "/Meche2.png", "/Meche3.png"],
  },
  {
    title: "Módulo de Gestión Inmobiliaria (Concept Demo)",
    description: "Prototipo funcional de catálogo dinámico para desarrollos residenciales y comerciales.",
    image: "/RE1.png",
    imageFallback: "/R E 1.png",
    gallery: ["/RE1.png", "/R E.png", "/R E 1.png", "/Real Estate.png"],
  },
  {
    title: "Grupo Frimac: Infraestructura Digital Corporativa",
    description: "Desarrollo de plataforma robusta para la presentación de proyectos de ingeniería y captación de licitaciones. Enfoque en autoridad visual y confianza técnica.",
    image: "/Frimac 11.png",
    imageFallback: "/Frimac.png",
    gallery: [
      "/Frimac 11.png",
      "/Frimac1.png",
      "/Frimac2.png",
      "/Frimac3.png",
      "/Frimac4.png",
    ],
  },
  {
    title: "Grupo Nagasapi: Plataforma de Merchandising y Promocionales Corporativos",
    description: "Sitio optimizado para la exhibición de catálogos promocionales industriales. Estructura diseñada para facilitar la solicitud de cotizaciones por volumen.",
    image: "/naga1.png",
    imageFallback: "/Mock nagasapi.png",
    gallery: ["/naga1.png", "/Naga2.png", "/Naga3.png", "/Naga4.png"],
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

type ProjectImageProps = {
  gallery: string[];
  imageFallback: string;
  alt: string;
};

const IMAGE_BOX_HEIGHT = 280;

function ProjectImage({ gallery, imageFallback, alt }: ProjectImageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const images = gallery.length > 0 ? gallery : [];

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden bg-[#F5F5F5]"
      style={{ height: IMAGE_BOX_HEIGHT }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {images.map((src, idx) => {
          const displaySrc = failedSrcs.has(src) ? imageFallback : src;
          return (
            <motion.div
              key={`${src}-${idx}`}
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: idx === activeIndex ? 1 : 0 }}
              initial={false}
              animate={{ opacity: idx === activeIndex ? 1 : 0 }}
              transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
              aria-hidden={idx !== activeIndex}
            >
              <Image
                src={displaySrc}
                alt={`${alt} - imagen ${idx + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                loading="lazy"
                onError={() => setFailedSrcs((prev) => new Set(prev).add(src))}
              />
            </motion.div>
          );
        })}
      </div>
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
              className="card-proyectos overflow-hidden rounded-xl border border-[#869397]/40 bg-white shadow-[0_4px_20px_rgba(0,53,148,0.08),0_0_0_1px_rgba(134,147,151,0.12)] transition-all duration-300 hover:border-[#003594] hover:shadow-[0_10px_32px_rgba(0,53,148,0.16),0_0_0_1px_rgba(0,53,148,0.14)]"
            >
              <ProjectImage
                gallery={p.gallery ?? [p.image]}
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
