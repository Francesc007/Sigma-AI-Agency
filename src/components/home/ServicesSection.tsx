"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    id: "landings",
    title: "Landing Pages de Alta Conversión",
    description: "Interfaces de aterrizaje rápidas y optimizadas para transformar visitantes en prospectos calificados. Ideal para concesionarias de gama alta, desarrollos inmobiliarios en preventa y servicios B2B.",
    href: "#ready-to-talk",
    accent: "Conversión",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    imageAlt: "Dashboard y métricas de conversión",
  },
  {
    id: "plataformas",
    title: "Plataformas Web Corporativas",
    description: "Ecosistemas digitales que centralizan la identidad de tu marca, organizan tu catálogo y proyectan solidez. Arquitectura escalable, panel de autogestión e infraestructura lista para CRMs.",
    href: "#ready-to-talk",
    accent: "Marca",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    imageAlt: "Equipo y presencia corporativa",
  },
  {
    id: "sistemas",
    title: "Desarrollo de Sistemas y Dashboards Personalizados",
    description: "Gestión de inventarios en tiempo real, dashboards (Sanity), automatización de flujos de datos y arquitectura independiente. Tú tienes el dominio total de tu información.",
    href: "#ready-to-talk",
    accent: "Control",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Datos y análisis",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="servicios"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div
        className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#003594] to-transparent opacity-80"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,_#F8FAFC_0%,_#FFFFFF_15%,_#FFFFFF_85%,_#F5F5F5_100%)]"
        aria-hidden
      />
      <div
        className="absolute -right-20 -top-20 size-64 rounded-full bg-[#869397]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-20 -left-20 size-64 rounded-full bg-[#003594]/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-[#869397]/40 bg-white px-4 py-1.5 text-sm font-medium text-[#003594] shadow-sm">
            Lo que hacemos
          </span>
          <h2
            id="services-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-[#003594] md:text-4xl lg:text-5xl"
          >
            Soluciones digitales enfocadas en resultados
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#8695A3]">
            Diseñamos y desarrollamos lo que tu sector de alto valor necesita: landings, plataformas y sistemas a medida.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-14 grid gap-8 lg:grid-cols-3"
        >
          {SERVICES.map((s) => (
            <motion.div key={s.id} id={s.id} className="scroll-mt-28" variants={cardItem}>
              <Link href={s.href} className="group block h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-[#869397]/20 bg-white shadow-xl shadow-[#003594]/5 transition-all duration-300 hover:border-[#003594]/40 hover:shadow-2xl hover:shadow-[#003594]/10">
                  {/* Imagen de fondo en la mitad superior */}
                  <div className="relative h-48 w-full overflow-hidden sm:h-52">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"
                      aria-hidden
                    />
                    <span className="service-accent absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-white/30 bg-white/15 px-3.5 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
                      <span className="size-1.5 rounded-full bg-white/90" aria-hidden />
                      {s.accent}
                    </span>
                  </div>
                  <div className="relative p-6">
                    <h3 className="text-xl font-semibold text-[#003594] group-hover:text-[#003594]">
                      {s.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[#8695A3]">
                      {s.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#003594] transition-transform group-hover:translate-x-1">
                      Saber más
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
