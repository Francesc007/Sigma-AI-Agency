"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MobileCardBorderSweep } from "@/components/home/MobileCardBorderSweep";
import { buildProjectInquiryMessage, openWhatsApp } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().trim().min(2, "Nombre requerido"),
  email: z.string().trim().email("Email válido requerido"),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, "Teléfono válido (mín. 10 dígitos)"),
  message: z.string().trim().min(5, "Cuéntanos brevemente tu proyecto"),
});

type FormValues = z.infer<typeof schema>;

export function ReadyToTalkSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onInvalid = () => {
    const firstError = document.querySelector<HTMLElement>("[aria-invalid='true']");
    firstError?.focus();
    firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onSubmit = (data: FormValues) => {
    openWhatsApp(buildProjectInquiryMessage(data));
    reset();
  };

  return (
    <section
      ref={ref}
      id="ready-to-talk"
      data-cursor-zone="dark"
      className="relative scroll-mt-20 overflow-hidden py-16 md:py-24"
      aria-labelledby="ready-heading"
    >
      {/* Fondo: imagen más visible, degradado suave */}
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MobileCardBorderSweep roundedClassName="rounded-xl" className="mx-auto w-full max-w-sm sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="w-full rounded-xl border border-white/15 bg-white/90 p-5 shadow-xl shadow-[#003594]/15 backdrop-blur-sm transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-[0_14px_48px_-8px_rgba(255,255,255,0.35),0_0_0_1px_rgba(255,255,255,0.25),0_0_44px_rgba(200,214,230,0.45)] sm:p-6"
        >
          <h2 id="ready-heading" className="text-lg font-bold text-[#003594] sm:text-xl">
            Hablemos de tu proyecto
          </h2>
          <p className="mt-1 text-sm text-[#8695A3]">
            Completa el formulario y continúa en WhatsApp para agendar tu consultoría.
          </p>

          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="mt-4 grid gap-3" noValidate>
            <div>
              <label htmlFor="rt-name" className="mb-0.5 block text-xs font-medium text-[#003594]">
                Nombre *
              </label>
              <Input
                id="rt-name"
                placeholder="Tu nombre"
                className="h-9 text-sm transition-all duration-200 focus:ring-2 focus:ring-[#869397] focus:ring-offset-1"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-0.5 text-xs text-red-600" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="rt-email" className="mb-0.5 block text-xs font-medium text-[#003594]">
                Correo *
              </label>
              <Input
                id="rt-email"
                type="email"
                placeholder="tu@email.com"
                className="h-9 text-sm transition-all duration-200 focus:ring-2 focus:ring-[#869397] focus:ring-offset-1"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-0.5 text-xs text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="rt-phone" className="mb-0.5 block text-xs font-medium text-[#003594]">
                WhatsApp *
              </label>
              <Input
                id="rt-phone"
                type="tel"
                placeholder="+52 55 5459 0883"
                className="h-9 text-sm transition-all duration-200 focus:ring-2 focus:ring-[#869397] focus:ring-offset-1"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="mt-0.5 text-xs text-red-600" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="rt-message" className="mb-0.5 block text-xs font-medium text-[#003594]">
                Proyecto *
              </label>
              <Textarea
                id="rt-message"
                placeholder="Breve descripción..."
                className="min-h-[72px] text-sm transition-all duration-200 focus:ring-2 focus:ring-[#869397] focus:ring-offset-1"
                {...register("message")}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="mt-0.5 text-xs text-red-600" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button type="submit" size="sm" className="mt-1 w-full">
              Continuar en WhatsApp
            </Button>
          </form>
        </motion.div>
        </MobileCardBorderSweep>
      </div>
    </section>
  );
}
