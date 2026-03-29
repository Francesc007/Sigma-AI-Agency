import Image from "next/image";

const LOGOS = [
  { src: "/Logo Face.png", alt: "Logo Face" },
  { src: "/Logo 1.png", alt: "Logo 1" },
  { src: "/Logo LPB.png", alt: "Logo LPB" },
  { src: "/Logo tepexi.png", alt: "Logo tepexi" },
] as const;

function LogoRow({ suffix, ariaHidden }: { suffix: string; ariaHidden?: boolean }) {
  return (
    <div
      className="partners-marquee-group flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12 lg:gap-16 lg:pr-16"
      {...(ariaHidden ? { "aria-hidden": true } : {})}
    >
      {LOGOS.map((logo) => (
        <div
          key={`${logo.src}-${suffix}`}
          className="partners-marquee-item group relative flex h-[52px] w-[112px] shrink-0 items-center justify-center md:h-[60px] md:w-[132px]"
        >
          <div className="relative h-full w-full transition-[transform,filter] duration-500 ease-out group-hover:z-20 group-hover:scale-[1.14] group-hover:-translate-y-2 group-hover:drop-shadow-[0_12px_28px_rgba(0,53,148,0.22)]">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 104px, 120px"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Carrusel horizontal continuo (bucle sin salto): dos copias del mismo bloque + translate -50%.
 * Coloca en /public las imágenes indicadas en LOGOS.
 */
export function PartnersLogoMarquee() {
  return (
    <section
      className="relative border-y border-[#869397]/12 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F4F7FA] py-6 md:py-8"
      aria-labelledby="partners-marquee-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#003594]/10 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id="partners-marquee-heading"
          className="text-center text-base font-bold tracking-tight text-[#003594] sm:text-lg md:text-xl"
        >
          Marcas que confían en{" "}
          <span className="font-zantiqa text-[#869397]">SIGMA AI AGENCY</span>
        </h2>
      </div>

      <div className="partners-marquee-clip relative mx-auto mt-5 max-w-3xl overflow-x-hidden overflow-y-visible px-2 py-2 md:mt-6 md:px-4">
        <div className="partners-marquee-track flex w-max min-w-max">
          <LogoRow suffix="a" />
          <LogoRow suffix="b" ariaHidden />
        </div>
      </div>
    </section>
  );
}
