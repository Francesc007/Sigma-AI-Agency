import Link from "next/link";
import { Instagram, Lock, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      id="contacto"
      className="relative scroll-mt-24 bg-[#003594] text-white"
      role="contentinfo"
      data-cursor-zone="dark"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 md:items-center">
          <div className="relative z-10 flex flex-col gap-4">
            <Logo
              size={56}
              showText
              textSpacing="wide"
              useZantiqa
              textClassName="text-[#b8c2c6]"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="inline-flex flex-wrap items-center justify-center gap-x-2 text-sm text-white/90">
              <a
                href="tel:+525554590883"
                className="inline-flex transition hover:text-white"
                aria-label="Llamar: +52 55 5459 0883"
              >
                <Phone className="size-4" aria-hidden />
              </a>
              <span className="text-white/45" aria-hidden>
                /
              </span>
              <a
                href="https://wa.me/525554590883"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transition hover:text-white"
                aria-label="WhatsApp: +52 55 5459 0883"
              >
                <MessageCircle className="size-4" aria-hidden />
              </a>
              <span className="ml-0.5 font-bold tabular-nums">+52 55 5459 0883</span>
            </p>
            <a
              href="mailto:contacto@sigmaaiagency.com"
              className="text-sm text-white/90 transition hover:text-white hover:underline"
            >
              contacto@sigmaaiagency.com
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#b8c2c6] transition hover:bg-white/10 hover:text-white"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="size-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#b8c2c6] transition hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#b8c2c6] transition hover:bg-white/10 hover:text-white"
                aria-label="X"
              >
                <XIcon className="size-5" />
              </a>
          </div>
        </div>

        <div className="mt-10 grid gap-4 border-t border-white/15 pt-6 md:grid-cols-3 md:items-center">
          <div className="flex md:justify-start">
            <div className="flex w-fit items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <Lock className="size-5 text-white/90" aria-hidden />
              <div className="leading-tight">
                <div className="text-xs font-bold tracking-widest">SECURE</div>
                <div className="text-xs text-white/80">SSL ENCRYPTION</div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-white/70">
            © 2026 Sigma AI Agency. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:justify-end">
            <Link href="/terminos" className="text-white/85 hover:text-white hover:underline">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="text-white/85 hover:text-white hover:underline">
              Aviso de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
