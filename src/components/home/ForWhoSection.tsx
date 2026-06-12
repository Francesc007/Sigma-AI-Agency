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
      id="para-quien-es-esto"
      ref={ref}
      data-cursor-zone="dark"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
      aria-labelledby="forwho-heading"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#003594]/65 via-[#003594]/55 to-[#041E42]/60"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)`,
          }}
          aria-hidden
        />
      </div>
      <div
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#869397]/30 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            ¿Para quién es esto?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-[#8695A3] md:text-xl">
            Nuestros servicios están diseñados para organizaciones que buscan atraer más clientes, optimizar su operación y contar con soluciones que realmente aporten valor para seguir creciendo.
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
