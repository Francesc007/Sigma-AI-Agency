"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { AudienceOrbit } from "@/components/AudienceOrbit";

export function ForWhoSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative scroll-mt-20 py-20 md:py-28"
      aria-labelledby="forwho-heading"
    >
      {/* Imagen de fondo: servicios (overflow aquí para no recortar íconos en móvil) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src="/servicios.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/75 via-[#F8FAFC]/88 to-white/75"
          aria-hidden
        />
      </div>
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
          <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-[#8695A3] md:text-xl">
            Nuestros servicios están pensados para empresas que buscan atraer más clientes, optimizar su operación y contar con soluciones web que realmente aporten valor.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-14 overflow-visible"
        >
          <AudienceOrbit />
        </motion.div>
      </div>
    </section>
  );
}
