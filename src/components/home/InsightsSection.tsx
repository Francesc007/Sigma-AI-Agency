"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const INSIGHTS = [
  {
    title: "Beneficios de la IA en Manufactura",
    excerpt: "Cómo la automatización y el análisis predictivo están transformando la industria.",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop",
    href: "#",
    date: "28 Feb 2026",
  },
  {
    title: "Chatbots que venden: guía para e-commerce",
    excerpt: "Casos reales de aumento de conversión con asistentes IA.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    href: "#",
    date: "25 Feb 2026",
  },
  {
    title: "No-Code y IA: el futuro ya está aquí",
    excerpt: "Herramientas que permiten a cualquier negocio escalar sin equipo técnico.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    href: "#",
    date: "22 Feb 2026",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function InsightsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="insights"
      className="scroll-mt-20 bg-[#F5F5F5] py-20 md:py-28"
      aria-labelledby="insights-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="insights-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center text-3xl font-bold text-[#003594] md:text-4xl"
        >
          Insights Recientes
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INSIGHTS.map((post) => (
            <motion.article key={post.title} variants={item}>
              <Card className="h-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="relative aspect-[6/4] w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-[#8695A3]">{post.date}</p>
                  <h3 className="mt-1 text-lg font-semibold text-[#003594]">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#8695A3]">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-[#869397]/40 p-4">
                  <Button variant="link" size="sm" asChild>
                    <Link href={post.href}>Leer Más</Link>
                  </Button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded p-1.5 text-[#8695A3] hover:bg-[#869397]/20 hover:text-[#003594]"
                      aria-label="Compartir"
                    >
                      <Share2 className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded p-1.5 text-[#8695A3] hover:bg-[#869397]/20 hover:text-[#003594]"
                      aria-label="Guardar"
                    >
                      <Heart className="size-4" />
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
