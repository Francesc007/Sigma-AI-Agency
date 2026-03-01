"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Car, Briefcase, Rocket } from "lucide-react";

const AUDIENCES = [
  {
    icon: Car,
    text: "Concesionarias y Real Estate que buscan automatizar su inventario.",
    label: "Automotriz & Inmobiliario",
  },
  {
    icon: Briefcase,
    text: "Empresas B2B que necesitan catálogos digitales de alta conversión.",
    label: "B2B",
  },
  {
    icon: Building2,
    text: "Negocios de servicios que requieren presencia profesional y robusta.",
    label: "Servicios",
  },
  {
    icon: Rocket,
    text: "Emprendedores escalando hacia soluciones personalizadas (No-Code/IA).",
    label: "Escalamiento",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function ForWhoSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
      aria-labelledby="forwho-heading"
    >
      {/* Fondo con gradiente y detalle lateral */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white via-[#F8FAFC] to-white"
        aria-hidden
      />
      <div
        className="absolute -right-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#003594]/5 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#869397]/30 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-[#869397]/40 bg-white px-4 py-1.5 text-sm font-medium text-[#003594] shadow-sm">
            Nuestro público
          </span>
          <h2
            id="forwho-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-[#003594] md:text-4xl lg:text-5xl"
          >
            ¿Para quién es esto?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#8695A3]">
            Nuestros servicios están pensados para empresas que buscan atraer más clientes, optimizar su operación y contar con soluciones web que realmente aporten valor.
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {AUDIENCES.map((audience, i) => (
            <motion.li
              key={i}
              variants={item}
              className="group flex gap-5 rounded-2xl border border-[#869397]/20 bg-white p-6 shadow-md shadow-[#003594]/5 transition-all duration-300 hover:border-[#003594]/25 hover:shadow-lg hover:shadow-[#003594]/10"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#003594] text-white shadow-md transition-transform group-hover:scale-105">
                <audience.icon className="size-7" aria-hidden />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#869397]">
                  {audience.label}
                </span>
                <p className="mt-1 text-[#003594] font-medium leading-snug">
                  {audience.text}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
