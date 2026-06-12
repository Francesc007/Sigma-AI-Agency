"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarBrand } from "@/components/layout/NavbarBrand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "#servicios", label: "Soluciones" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

function navHref(href: string, pathname: string) {
  if (href === "#contacto" && pathname !== "/") return "/#contacto";
  return href;
}

const WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE);

export function Navbar() {
  const pathname = usePathname();
  const forceSolid = pathname !== "/";
  const [scrollPastThreshold, setScrollPastThreshold] = useState(false);
  const scrolled = forceSolid || scrollPastThreshold;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("navbar-scrolled", scrolled);
    return () => root.classList.remove("navbar-scrolled");
  }, [scrolled]);

  useEffect(() => {
    if (forceSolid) return;
    const onScroll = () => setScrollPastThreshold(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceSolid]);

  useEffect(() => {
    if (!mobileOpen) return;
    window.scrollTo({ left: 0, top: window.scrollY });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

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
        "fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
      role="banner"
      data-cursor-zone={!scrolled && pathname === "/" ? "dark" : undefined}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 max-lg:min-w-0">
        <NavbarBrand scrolled={scrolled} />

        <div className="hidden items-center gap-6 lg:flex lg:gap-8">
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
            "relative z-[60] flex size-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border shadow-md lg:hidden",
            scrolled
              ? "border-[#869397] bg-white"
              : "border-white/90 bg-[#003594]"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
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
          <>
            <motion.button
              key="mobile-menu-backdrop"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-[#041E42]/40 lg:hidden"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-menu-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 z-[60] w-full max-w-[100vw] px-4 pt-2 lg:hidden"
              style={{ top: "var(--navbar-height)" }}
            >
              <nav
                className="mx-auto flex w-full max-w-md flex-col gap-3 rounded-2xl border border-[#869397]/25 bg-white p-4 shadow-xl"
                aria-label="Menú móvil"
              >
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={navHref(link.href, pathname)}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-lg font-medium text-[#003594] active:bg-[#003594]/5"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button variant="primary" className="mt-1 w-full" asChild>
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
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
