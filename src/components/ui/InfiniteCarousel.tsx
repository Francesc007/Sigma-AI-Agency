"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/images/Sigma AI.jpg", alt: "Sigma AI" },
  { src: "/images/Vibe Coding.jpg", alt: "Vibe Coding" },
  { src: "/images/Logo Azul.jpg", alt: "Logo Azul" },
];

const AUTOPLAY_MS = 4000;
const TRANSITION_MS = 500;

/**
 * Carrusel infinito: 1 → 2 → 3 → 1 → 2 → 3...
 * Duplica el primer slide al final; al llegar al duplicado se resetea al slide 1 sin animación.
 */
export function InfiniteCarousel() {
  const [index, setIndex] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);

  const totalSlides = SLIDES.length + 1;

  const goNext = useCallback(() => {
    setIndex((i) => {
      if (i === totalSlides - 1) {
        setSkipTransition(true);
        return 0;
      }
      return i + 1;
    });
  }, [totalSlides]);

  useEffect(() => {
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [goNext]);

  useEffect(() => {
    if (skipTransition) {
      const t = setTimeout(() => setSkipTransition(false), 50);
      return () => clearTimeout(t);
    }
  }, [skipTransition]);

  const slidesToRender = [...SLIDES, SLIDES[0]];

  return (
    <section className="infinite-carousel w-full overflow-hidden" aria-label="Carrusel">
      <div className="relative mx-auto max-w-4xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0a0a0a] shadow-xl">
          <div
            data-carousel-track
            className="flex h-full w-full"
            style={{
              width: `${totalSlides * 100}%`,
              transform: `translateX(-${index * (100 / totalSlides)}%)`,
              transition: skipTransition ? "none" : `transform ${TRANSITION_MS}ms ease-in-out`,
            }}
          >
            {slidesToRender.map((slide, i) => (
              <div
                key={`${slide.src}-${i}`}
                className="flex shrink-0 items-center justify-center bg-[#111]"
                style={{ width: `${100 / totalSlides}%` }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex justify-center gap-2" aria-hidden>
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`inline-block h-2 w-2 rounded-full transition-colors ${
                index % SLIDES.length === i ? "bg-[#003594]" : "bg-[#869397]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
