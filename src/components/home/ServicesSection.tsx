"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { BarChart3, Cog, Zap, type LucideIcon } from "lucide-react";
import { StackingCards } from "@/components/home/StackingCards";

const MICRO_COPY = "Sistemas a medida para PyMEs de alto valor";

const SERVICES = [
  {
    id: "automatizacion",
    title: "Automatización Operativa",
    description:
      "Sistemas inteligentes para levantamientos, inventarios y gestión de activos que eliminan el error humano y aceleran tu operación.",
    icon: Cog,
    image: "/concesionaria1.png",
    imageAlt: "Dashboard y sistema de datos construido con Sanity",
  },
  {
    id: "cotizacion",
    title: "Cotización Dinámica",
    description:
      "Herramientas que calculan variables complejas al instante, permitiendo cotizar en minutos, no en días.",
    icon: Zap,
    image: "/7.png",
    imageAlt: "Vista de plataforma corporativa Grupo Frimac",
  },
  {
    id: "landings",
    title: "Landing Pages de Conversión",
    description:
      "Sitios de alto rendimiento optimizados para captar prospectos calificados e integrarlos directamente a tu CRM o base de datos.",
    icon: BarChart3,
    image: "/landing5.png",
    imageAlt: "Landing page con catálogo y productos Naga",
  },
] as const;

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

type Service = (typeof SERVICES)[number];

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon as LucideIcon;

  return (
    <article className="group block h-full cursor-default">
      <div className="card-soluciones relative z-0 h-full overflow-visible rounded-2xl border border-[#869397]/40 bg-white shadow-[0_4px_20px_rgba(0,53,148,0.08),0_0_0_1px_rgba(134,147,151,0.1)] transition-all duration-300 group-hover:z-30 group-hover:border-[#003594]/45 group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-[#003594]/[0.04] group-hover:shadow-[0_12px_42px_rgba(0,53,148,0.22),0_0_0_1px_rgba(0,53,148,0.14),0_0_40px_rgba(0,53,148,0.12)]">
        <div className="group relative flex h-56 w-full items-center justify-center overflow-visible bg-[#F0F2F5] transition-colors duration-300 group-hover:bg-[#EEF2F8] sm:h-64">
          <div className="absolute inset-4 sm:inset-5">
            <div className="service-image-frame relative h-full w-full overflow-hidden rounded-2xl border border-[#869397]/25 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-[1.25] max-lg:group-hover:translate-y-0 max-lg:group-hover:scale-100">
              <div className="mobile-image-life relative h-full w-full">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={service.id === "landings"}
                />
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/30 to-transparent"
            aria-hidden
          />
        </div>
        <div className="relative p-6">
          <div className="flex size-10 items-center justify-center rounded-xl border border-[#003594]/15 bg-[#003594]/5 text-[#003594] transition-colors duration-300 group-hover:border-[#003594]/30 group-hover:bg-[#003594]/10 group-hover:shadow-[0_0_20px_rgba(0,53,148,0.12)]">
            <Icon className="size-5" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-3 text-xl font-semibold text-[#003594]">{service.title}</h3>
          <p className="mt-3 leading-relaxed text-[#8695A3]">{service.description}</p>
        </div>
      </div>
    </article>
  );
}

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="servicios"
      className="relative scroll-mt-20 overflow-visible py-20 lg:overflow-hidden lg:py-28"
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
          <span className="inline-block rounded-full border border-[#869397]/40 bg-white px-4 py-1.5 text-sm font-medium text-[#003594] shadow-sm">
            Lo que hacemos
          </span>
          <h2
            id="services-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-[#003594] md:text-4xl lg:text-5xl"
          >
            Soluciones digitales enfocadas en resultados operativos
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#8695A3]">
          Diseñamos y desarrollamos la tecnología que tu sector necesita: sistemas de automatización a medida, herramientas de gestión profesional y landings de alto impacto.
          </p>
        </motion.div>

        <StackingCards className="mt-10 lg:hidden" endSpacerVh={24}>
          {SERVICES.map((service) => (
            <div key={service.id} id={service.id} className="scroll-mt-28">
              <ServiceCard service={service} />
            </div>
          ))}
        </StackingCards>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-14 hidden gap-8 lg:grid lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.id} id={service.id} className="scroll-mt-28" variants={cardItem}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-8 text-center lg:mt-10"
        >
          <span className="inline-block rounded-full border-[0.5px] border-[#003594]/35 bg-[#F4F7FA] px-3.5 py-1 text-xs font-medium text-[#869397]">
            {MICRO_COPY}
          </span>
        </motion.p>
      </div>
    </section>
  );
}
