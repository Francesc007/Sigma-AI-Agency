"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SubscribeSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "subscribe", name: "", phone: "" }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={ref}
      id="subscribe"
      className="scroll-mt-20 bg-[#003594] py-16 md:py-20"
      aria-labelledby="subscribe-heading"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          id="subscribe-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl font-bold text-white md:text-3xl"
        >
          Suscríbete a nuestro newsletter
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-2 text-white/90"
        >
          Recibe insights de IA y automatización para tu negocio.
        </motion.p>
        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-[#869397]"
            role="status"
          >
            ¡Gracias! Revisa tu correo.
          </motion.p>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="min-w-[240px] border-[#869397] bg-white text-[#003594]"
              aria-label="Email para suscripción"
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="border-[#869397] bg-[#869397] text-white hover:bg-[#6b787a]"
              disabled={status === "loading"}
            >
              {status === "loading" ? "…" : "Suscríbete"}
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
