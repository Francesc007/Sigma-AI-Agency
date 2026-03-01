"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const SECTORS = [
  {
    id: "ecommerce",
    label: "E-commerce",
    color: "#003594",
    data: [
      { name: "Consultas IA", value: 1200, full: 1200 },
      { name: "Ahorro Tiempo", value: 40, full: 100 },
      { name: "Conversión", value: 28, full: 100 },
    ],
    pieData: [
      { name: "Ventas", value: 45, color: "#003594" },
      { name: "Soporte", value: 30, color: "#869397" },
      { name: "Marketing", value: 25, color: "#869397" },
    ],
  },
  {
    id: "manufactura",
    label: "Manufactura",
    color: "#869397",
    data: [
      { name: "Consultas IA", value: 800, full: 1000 },
      { name: "Ahorro Tiempo", value: 35, full: 100 },
      { name: "Eficiencia", value: 52, full: 100 },
    ],
    pieData: [
      { name: "Producción", value: 50, color: "#003594" },
      { name: "Calidad", value: 30, color: "#869397" },
      { name: "Logística", value: 20, color: "#869397" },
    ],
  },
  {
    id: "servicios",
    label: "Servicios",
    color: "#003594",
    data: [
      { name: "Consultas IA", value: 950, full: 1100 },
      { name: "Ahorro Tiempo", value: 45, full: 100 },
      { name: "NPS", value: 72, full: 100 },
    ],
    pieData: [
      { name: "Atención", value: 55, color: "#003594" },
      { name: "Back-office", value: 25, color: "#869397" },
      { name: "Ventas", value: 20, color: "#869397" },
    ],
  },
  {
    id: "fintech",
    label: "Fintech",
    color: "#869397",
    data: [
      { name: "Consultas IA", value: 1100, full: 1200 },
      { name: "Ahorro Tiempo", value: 50, full: 100 },
      { name: "Compliance", value: 98, full: 100 },
    ],
    pieData: [
      { name: "Riesgo", value: 40, color: "#003594" },
      { name: "Operaciones", value: 35, color: "#869397" },
      { name: "UX", value: 25, color: "#869397" },
    ],
  },
];

export function SectorsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const sector = SECTORS[active];

  return (
    <section
      ref={ref}
      id="sectores"
      className="scroll-mt-20 bg-[#F5F5F5] py-20 md:py-28"
      aria-labelledby="sectors-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="sectors-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center text-3xl font-bold text-[#003594] md:text-4xl"
        >
          Sectores en los que Destacamos
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[#8695A3]">
          E-commerce, Manufactura, Servicios y Fintech: métricas que mejoran con IA.
        </p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Sectores"
        >
          {SECTORS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls={`panel-${s.id}`}
              id={`tab-${s.id}`}
              onClick={() => setActive(i)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? "bg-[#003594] text-white"
                  : "bg-white text-[#003594] hover:bg-[#869397]/30"
              }`}
            >
              {s.label}
            </button>
          ))}
        </motion.div>

        {/* Charts */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            id={`panel-${sector.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${sector.id}`}
            className="mt-10 grid gap-10 lg:grid-cols-2"
          >
            <div className="h-[280px] w-full rounded-xl bg-white p-4 shadow-sm">
              <p className="mb-2 text-sm font-medium text-[#003594]">Métricas (ejemplo)</p>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={sector.data} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <XAxis type="number" stroke="#8695A3" fontSize={12} />
                  <YAxis type="category" dataKey="name" width={100} stroke="#8695A3" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #869397" }}
                    formatter={(value: number) => [value, ""]}
                  />
                  <Bar dataKey="value" fill={sector.color} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-[280px] w-full rounded-xl bg-white p-4 shadow-sm">
              <p className="mb-2 text-sm font-medium text-[#003594]">Distribución</p>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={sector.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {sector.pieData.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
