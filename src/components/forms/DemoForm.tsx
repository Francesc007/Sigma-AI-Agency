"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const demoSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email válido requerido"),
  phone: z.string().min(10, "Teléfono válido"),
  message: z.string().min(5, "Cuéntanos brevemente tu proyecto"),
});

type DemoFormValues = z.infer<typeof demoSchema>;

export function DemoForm({ onSuccess }: { onSuccess?: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data: DemoFormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "demo_modal" }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="py-4 text-center text-[#869397]" role="status">
        ¡Listo! Te contactaremos pronto para agendar tu consultoría.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <div>
        <label htmlFor="demo-name" className="mb-1 block text-sm font-medium text-[#003594]">
          Nombre Completo *
        </label>
        <Input
          id="demo-name"
          placeholder="Tu nombre"
          className="transition-all duration-200 focus:ring-2 focus:ring-[#869397] focus:ring-offset-1"
          {...register("name")}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="demo-email" className="mb-1 block text-sm font-medium text-[#003594]">
          Correo *
        </label>
        <Input
          id="demo-email"
          type="email"
          placeholder="tu@email.com"
          className="transition-all duration-200 focus:ring-2 focus:ring-[#869397] focus:ring-offset-1"
          {...register("email")}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="demo-phone" className="mb-1 block text-sm font-medium text-[#003594]">
          Número de WhatsApp *
        </label>
        <Input
          id="demo-phone"
          type="tel"
          placeholder="+52 55 5459 0883"
          className="transition-all duration-200 focus:ring-2 focus:ring-[#869397] focus:ring-offset-1"
          {...register("phone")}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="demo-message" className="mb-1 block text-sm font-medium text-[#003594]">
          Platícanos de tu Proyecto *
        </label>
        <Textarea
          id="demo-message"
          placeholder="Cuéntanos tu necesidad o proyecto..."
          {...register("message")}
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          No pudimos enviar. Intenta de nuevo o llámanos.
        </p>
      )}
      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Enviando…
          </>
        ) : (
          "Enviar"
        )}
      </Button>
    </form>
  );
}
