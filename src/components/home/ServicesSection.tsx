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
    description:
      "Interfaces de aterrizaje rápidas y optimizadas para transformar visitantes en prospectos calificados. Ideal para concesionarias de gama alta, desarrollos inmobiliarios en preventa y servicios B2B.",
    href: "#ready-to-talk",
    accent: "Conversión",
    image: "/Naga 3.png",
    imageAlt: "Landing page con catálogo y productos Naga",
  },
  {
    id: "plataformas",
    title: "Plataformas Web Corporativas",
    description:
      "Ecosistemas digitales que centralizan la identidad de tu marca, organizan tu catálogo y proyectan solidez. Arquitectura escalable, panel de autogestión e infraestructura lista para CRMs.",
    href: "#ready-to-talk",
    accent: "Marca",
    image: "/Frimac1.png",
    imageAlt: "Vista de plataforma corporativa Grupo Frimac",
  },
  {
    id: "sistemas",
    title: "Desarrollo de Sistemas y Dashboards Personalizados",
    description:
      "Gestión de inventarios en tiempo real, dashboards (Sanity), automatización de flujos de datos y arquitectura independiente. Tú tienes el dominio total de tu información.",
    href: "#ready-to-talk",
    accent: "Control",
    image: "/Sanity1.png",
    imageAlt: "Dashboard y sistema de datos construido con Sanity",
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
                <div className="card-soluciones relative z-0 h-full overflow-visible rounded-2xl border border-[#869397]/40 bg-white shadow-[0_4px_20px_rgba(0,53,148,0.08),0_0_0_1px_rgba(134,147,151,0.1)] transition-all duration-300 group-hover:z-30 hover:border-[#003594] hover:shadow-[0_10px_36px_rgba(0,53,148,0.18),0_0_0_1px_rgba(0,53,148,0.14)]">
                  {/* Imagen más grande, se ve completa */}
                  <div className="group relative flex h-56 w-full items-center justify-center overflow-visible bg-[#F0F2F5] sm:h-64">
                    <div className="absolute inset-4 sm:inset-5">
                      <div className="service-image-frame relative h-full w-full overflow-hidden rounded-2xl border border-[#869397]/25 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-[1.25]">
                        <Image
                          src={s.image}
                          alt={s.imageAlt}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                    {/* Niebla muy sutil solo en el borde inferior */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/30 to-transparent"
                      aria-hidden
                    />
                  </div>
                  <div className="relative p-6">
                    <span className="inline-block border-l-4 border-[#003594] bg-[#003594]/5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#003594]">
                      {s.accent}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-[#003594] group-hover:text-[#003594]">
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
