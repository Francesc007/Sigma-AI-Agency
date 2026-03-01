"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    quote: "Sigma transformó mi e-commerce. Las consultas se responden solas y las ventas subieron 40%.",
    name: "Juan Pérez",
    role: "PetPlace",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "Implementamos chatbots en una semana. Nuestros clientes están encantados con la respuesta 24/7.",
    name: "María García",
    role: "Servicios Financieros MX",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "La consultoría de Sigma nos dio un roadmap claro. Hoy tenemos 3 procesos automatizados y seguimos.",
    name: "Roberto Sánchez",
    role: "Manufactura del Norte",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "ROI visible en 4 meses. No duden en agendar una demo.",
    name: "Ana López",
    role: "TechStart CDMX",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "El equipo de Sigma es profesional y los resultados superaron lo que esperábamos.",
    name: "Carlos Ruiz",
    role: "E-commerce México",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollLeft(el.scrollLeft);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      id="casos"
      className="scroll-mt-20 bg-white py-20 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="testimonials-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center text-3xl font-bold text-[#003594] md:text-4xl"
        >
          Lo que Dicen Nuestros Clientes
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth md:overflow-visible md:grid md:grid-cols-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            role="region"
            aria-label="Carrusel de testimonios"
          >
            {(TESTIMONIALS.concat(TESTIMONIALS)).map((t, i) => (
              <Card
                key={`${t.name}-${i}`}
                className="min-w-[300px] shrink-0 md:min-w-0"
              >
                <CardContent className="pt-6">
                  <Quote className="size-8 text-[#869397]/50" aria-hidden />
                  <p className="mt-2 text-[#003594]">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt=""
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#003594]">{t.name}</p>
                      <p className="text-sm text-[#8695A3]">{t.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5" aria-label={`${t.rating} estrellas`}>
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="size-4 fill-[#869397] text-[#869397]"
                          aria-hidden
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
