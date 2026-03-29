"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type NavbarBrandProps = {
  scrolled: boolean;
};

export function NavbarBrand({ scrolled }: NavbarBrandProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href="/#inicio"
      className={cn(
        "group relative z-10 inline-flex shrink-0 outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#869397] focus-visible:ring-offset-2 rounded-xl"
      )}
      aria-label="Sigma AI Agency - Inicio"
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", "/");
        }
      }}
    >
      <motion.span
        className="navbar-brand-wrap relative inline-flex"
        initial={reduceMotion ? false : { y: -10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="navbar-brand-deco" aria-hidden>
          <span className="navbar-brand-halo" />
          <span className="navbar-brand-ring" />
        </span>
        <motion.span
          className="relative z-20 inline-flex items-center"
          animate={
            reduceMotion
              ? {}
              : {
                  y: [0, -3, 0],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={
            reduceMotion
              ? {}
              : {
                  scale: 1.04,
                  transition: { type: "spring", stiffness: 400, damping: 22 },
                }
          }
          whileTap={{ scale: 0.97 }}
        >
          <Logo
            size={70}
            showText={false}
            textSpacing="wide"
            useZantiqa
            className="relative z-20 [&_img]:relative [&_img]:z-10 [&_img]:opacity-100"
            textClassName={cn(
              !scrolled ? "text-[#b8c2c6]" : undefined,
              "transition-colors duration-300",
              !scrolled && "group-hover:text-white",
              scrolled && "group-hover:text-[#001a4d]"
            )}
          />
        </motion.span>
      </motion.span>
    </Link>
  );
}
