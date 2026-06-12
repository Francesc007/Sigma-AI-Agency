"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { StackingCards } from "@/components/home/StackingCards";

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
    title: "Concesionarias: Sistema de Gestión de unidades y Leads",
    description:
      "Dashboard dinámico integrado a una landing de alto impacto. Actualización de stock en tiempo real y gestión de reseñas de clientes para prueba social y conversión de ventas.",
    image: "/Meche3.png",
    imageFallback: "/Mercedes Benz.png",
    gallery: ["/concesionaria.png", "/concesionaria2.png", "/concesionaria3.png", "/concesionaria4.png"],
  },
  {
    title: "Gestión y Supervisión Inteligente de Campo",
    description:
      "Digitalizamos el levantamiento y control de riesgos operativos en tiempo real mediante sistemas de registro, auditorías y bitácoras secuenciales. Solución escalable a sectores como construcción, seguridad e higiene y servicios de mantenimiento.",
    image: "/Real Estate.png",
    imageFallback: "/R E 1.png",
    gallery: ["/6.png", "/5.png", "/2.png", "/1.png"],
  },
  {
    title: "Motores de Cotización Dinámica",
    description:
      "Transformamos y personalizamos tus variables de precio, productos y logística en un motor de cotización inteligente. Agiliza la respuesta comercial, reduce errores de cálculo y permite a tu equipo de ventas emitir propuestas profesionales.",
    image: "/Frimac 11.png",
    imageFallback: "/Frimac.png",
    gallery: ["/4.png", "/3.png", "/7.png", "/8.png"],
  },
  {
    title: "Landing Pages de Conversión y Captación",
    description:
      "Desarrollamos ecosistemas digitales que transforman la gestión de sectores estratégicos. Cada proyecto está diseñado para centralizar tu operación, captar prospectos calificados y escalar tu capacidad de respuesta en tiempo real.",
    image: "/Naga1.png",
    imageFallback: "/Mock nagasapi.png",
    gallery: ["/landing.png", "/landing1.png", "/landing2.png", "/landing3.png"],
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
    <div className="relative h-[200px] w-full overflow-hidden bg-[#F5F5F5] sm:h-[240px] lg:h-[280px]">
      <div className="mobile-image-life relative h-full w-full overflow-hidden">
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
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
                loading="lazy"
                onError={() =>
                  setFailedSrcs((prev) => {
                    const next = new Set(prev);
                    next.add(src);
                    return next;
                  })
                }
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-proyectos block h-full overflow-hidden rounded-xl border border-[#869397]/40 bg-white shadow-[0_4px_20px_rgba(0,53,148,0.08),0_0_0_1px_rgba(134,147,151,0.12)] transition-all duration-300 hover:border-[#003594] hover:shadow-[0_12px_38px_rgba(0,53,148,0.2),0_0_0_1px_rgba(0,53,148,0.16),0_0_32px_rgba(0,53,148,0.1)]">
      <ProjectImage
        gallery={project.gallery ?? [project.image]}
        imageFallback={project.imageFallback}
        alt={project.title}
      />
      <div className="p-4 sm:p-6">
        <h3 className="text-base font-semibold text-[#003594] sm:text-lg lg:text-xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-[#8695A3] sm:text-base">{project.description}</p>
        <a
          href="#para-quien-es-esto"
          className="btn-cotizar mt-4 inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-all"
        >
          Cotizar Proyecto
        </a>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="proyectos"
      className="relative scroll-mt-20 overflow-visible bg-[#F5F5F5] py-16 sm:py-20 lg:overflow-hidden lg:py-28"
      aria-labelledby="projects-heading"
    >
      <motion.div
        className="pointer-events-none absolute left-0 top-1/2 z-0 hidden h-3.5 w-32 -translate-y-1/2 overflow-hidden rounded-full lg:block lg:w-52 xl:w-64"
        aria-hidden
        initial={{ scaleX: 0, opacity: 0.5 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "left center" }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#003594] via-[#003594]/60 to-transparent" />
        <span className="section-side-line__shine" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-0 top-1/2 z-0 hidden h-3.5 w-32 -translate-y-1/2 overflow-hidden rounded-full lg:block lg:w-52 xl:w-64"
        aria-hidden
        initial={{ scaleX: 0, opacity: 0.5 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        style={{ transformOrigin: "right center" }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-l from-[#869397]/80 via-[#869397]/40 to-transparent" />
        <span className="section-side-line__shine section-side-line__shine--delay" />
      </motion.div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <h2
            id="projects-heading"
            className="text-2xl font-bold text-[#003594] sm:text-3xl lg:text-4xl"
          >
            Portafolio de Proyectos: Casos de Éxito Operativo
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[#8695A3] sm:text-lg">
            Sistemas digitales que transforman la gestión de sectores estratégicos y eliminan el error humano en procesos críticos.
          </p>
        </motion.div>

        <StackingCards className="mt-8 sm:mt-10 lg:hidden" endSpacerVh={24}>
          {PROJECTS.map((project) => (
            <div key={project.title} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </StackingCards>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-8 hidden gap-6 sm:mt-10 sm:gap-8 lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-10"
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.title} variants={item} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
