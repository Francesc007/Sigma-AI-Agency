"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const CARDS = [
  {
    icon: Target,
    title: "Misión",
    description: "Hacer la IA accesible para cada negocio en México.",
  },
  {
    icon: Eye,
    title: "Visión",
    description: "Ser la agencia líder en automatización con IA en LATAM.",
  },
  {
    icon: Award,
    title: "Experiencia",
    description: "10+ años, +500 negocios, 98% satisfacción.",
    stats: ["500+", "98%", "10+"],
    statLabels: ["Negocios", "Satisfacción", "Años"],
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

export function AgencySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="nuestra-agencia"
      className="scroll-mt-20 bg-[#F5F5F5] py-20 md:py-28"
      aria-labelledby="agency-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="agency-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-bold text-[#003594] md:text-4xl"
        >
          Nuestra Agencia
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map((card) => (
            <motion.div key={card.title} variants={item}>
              <Card className="h-full transition-shadow hover:shadow-xl">
                <CardHeader>
                  <card.icon className="size-10 text-[#869397]" aria-hidden />
                  <h3 className="text-xl font-semibold text-[#003594]">{card.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-[#8695A3]">{card.description}</p>
                  {"stats" in card && card.stats && (
                    <div className="mt-4 flex gap-6">
                      {(card.stats as string[]).map((stat, i) => (
                        <div key={i} className="text-center">
                          <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="block text-2xl font-bold text-[#003594]"
                          >
                            {stat}
                          </motion.span>
                          <span className="block text-xs text-[#8695A3]">
                            {(card.statLabels as string[])[i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
