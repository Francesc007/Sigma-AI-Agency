"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarBrand } from "@/components/layout/NavbarBrand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#servicios", label: "Soluciones" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

function navHref(href: string, pathname: string) {
  if (href === "#contacto" && pathname !== "/") return "/#contacto";
  return href;
}

const WHATSAPP_NUMBER = "525554590883";
const WHATSAPP_MESSAGE = "Hola, Sigma AI Agency. Me gustaría cotizar un proyecto.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function Navbar() {
  const pathname = usePathname();
  const forceSolid = pathname !== "/";
  const [scrolled, setScrolled] = useState(forceSolid);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // En páginas internas (Términos/Privacidad), el navbar debe ser sólido desde arriba
    if (forceSolid) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceSolid]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: scrolled ? "rgba(255,255,255,0.98)" : "transparent",
        boxShadow: scrolled ? "0 1px 3px rgba(0,53,148,0.08)" : "none",
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
      role="banner"
      data-cursor-zone={!scrolled && pathname === "/" ? "dark" : undefined}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavbarBrand scrolled={scrolled} />

        <div className="hidden items-center gap-6 sm:flex lg:gap-8">
          <nav
            className="hidden items-center gap-6 lg:flex lg:gap-8"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={navHref(link.href, pathname)}
                className={cn(
                  "relative text-[0.95rem] font-medium sm:text-base after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full",
                  scrolled
                    ? "text-[#003594] after:bg-[#869397]"
                    : "text-[#b8c2c6] after:bg-[#b8c2c6]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button
            variant="primary"
            size="default"
            className={cn(
              "shrink-0 text-base",
              scrolled
                ? "" // usa el azul por defecto del variant primary
                : "bg-[#b8c2c6] text-[#003594] hover:bg-[#9ca8ac] hover:text-[#003594]"
            )}
            asChild
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cotizar Proyecto
            </a>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "relative z-10 flex size-10 flex-col items-center justify-center gap-1.5 rounded-lg lg:hidden",
            scrolled
              ? "border border-[#869397] bg-white"
              : "border border-white/80 bg-white/10"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full transition-all duration-200",
              scrolled ? "bg-[#003594]" : "bg-white",
              mobileOpen ? "translate-y-2 rotate-45" : ""
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full transition-all duration-200",
              scrolled ? "bg-[#003594]" : "bg-white",
              mobileOpen ? "opacity-0 scale-0" : "opacity-100"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full transition-all duration-200",
              scrolled ? "bg-[#003594]" : "bg-white",
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-0 z-40 overflow-y-auto bg-white pt-20 lg:hidden"
            aria-hidden={!mobileOpen}
          >
            <nav className="flex flex-col gap-4 px-4 pb-8" aria-label="Menú móvil">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={navHref(link.href, pathname)}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-[#003594]"
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="primary" className="w-full" asChild>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                >
                  Cotizar Proyecto
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
