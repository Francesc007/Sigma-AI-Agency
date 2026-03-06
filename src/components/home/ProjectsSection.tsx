"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

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

const CAROUSEL_INTERVAL_MS = 4500;
const CAROUSEL_TRANSITION_MS = 400;
const CAROUSEL_RESET_GAP_MS = 50;

type ProjectImageProps = {
  image: string;
  imageFallback: string;
  alt: string;
  gallery?: string[];
  carouselTick: number;
};

const IMAGE_BOX_HEIGHT = 280;

function ProjectImage({ image, imageFallback, alt, gallery, carouselTick }: ProjectImageProps) {
  const hasGallery = !!gallery && gallery.length > 1;
  const slides = hasGallery ? [...gallery!, gallery![0]] : [image];
  const slideCount = slides.length;

  const [pos, setPos] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);

  useEffect(() => {
    setPos(0);
    setSkipTransition(false);
  }, [image, imageFallback, alt, gallery?.join("|")]);

  useEffect(() => {
    if (!hasGallery) return;
    setPos((p) => p + 1);
  }, [carouselTick, hasGallery]);

  useEffect(() => {
    if (!hasGallery) return;
    // Al llegar al slide duplicado, dejamos que termine la transición y reseteamos sin animación.
    if (pos === slideCount - 1) {
      const t = setTimeout(() => {
        setSkipTransition(true);
        setPos(0);
      }, CAROUSEL_TRANSITION_MS);
      return () => clearTimeout(t);
    }
  }, [pos, hasGallery, slideCount]);

  useEffect(() => {
    if (!skipTransition) return;
    const t = setTimeout(() => setSkipTransition(false), CAROUSEL_RESET_GAP_MS);
    return () => clearTimeout(t);
  }, [skipTransition]);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#F5F5F5]"
      style={{ height: IMAGE_BOX_HEIGHT }}
    >
      {hasGallery ? (
        <motion.div
          className="flex h-full"
          style={{ width: `${slideCount * 100}%` }}
          animate={{ x: `-${pos * (100 / slideCount)}%` }}
          transition={{
            duration: skipTransition ? 0 : CAROUSEL_TRANSITION_MS / 1000,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {slides.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="flex shrink-0 items-center justify-center"
              style={{ width: `${100 / slideCount}%` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="h-full w-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = "1";
                    target.src = imageFallback;
                  }
                }}
              />
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt}
            className="h-full w-full object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = "1";
                target.src = imageFallback;
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [carouselTick, setCarouselTick] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCarouselTick((t) => t + 1),
      CAROUSEL_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, []);

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
                image={p.image}
                imageFallback={p.imageFallback}
                alt={p.title}
                gallery={p.gallery}
                carouselTick={carouselTick}
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
