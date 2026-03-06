export const metadata = {
  title: "Términos y condiciones | Sigma AI Agency",
  description: "Términos y condiciones de Sigma AI Agency.",
};

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#003594]">Términos y Condiciones</h1>
      <p className="mt-4 text-[#8695A3]">
        Estos términos regulan el uso de nuestro sitio y la contratación de servicios de Sigma AI Agency.
        Al navegar o solicitar una propuesta, aceptas lo siguiente.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-[#003594]">1. Servicios</h2>
        <p className="text-[#8695A3]">
          Diseñamos y desarrollamos soluciones digitales como landing pages de conversión, plataformas web
          corporativas, sistemas y dashboards personalizados, e integraciones/automatizaciones. El alcance,
          entregables, tiempos y costos se definen por escrito (propuesta, contrato o orden de trabajo).
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">2. Propuestas y cambios</h2>
        <p className="text-[#8695A3]">
          Las cotizaciones y estimaciones dependen de información proporcionada por el cliente. Cambios de
          alcance (features, integraciones, diseño, contenido) pueden requerir ajuste de tiempos y costos.
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">3. Contenido y materiales del cliente</h2>
        <p className="text-[#8695A3]">
          El cliente es responsable de contar con derechos de uso sobre logos, fotografías, textos, marcas
          y materiales que nos entregue. Sigma AI Agency puede solicitar reemplazos si un material no es
          apto para uso comercial o infringe derechos de terceros.
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">4. Propiedad intelectual</h2>
        <p className="text-[#8695A3]">
          Salvo acuerdo distinto por escrito, el cliente obtiene una licencia/cesión sobre los entregables
          pagados (diseños y código específicos del proyecto). Herramientas internas, plantillas, librerías
          y componentes reutilizables pueden permanecer como propiedad de Sigma AI Agency.
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">5. Confidencialidad</h2>
        <p className="text-[#8695A3]">
          Tratamos la información del cliente como confidencial y la usamos únicamente para operar el
          proyecto. Podemos firmar un NDA cuando aplique.
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">6. Disponibilidad y garantías</h2>
        <p className="text-[#8695A3]">
          Hacemos mejores esfuerzos por entregar soluciones estables y seguras. No garantizamos resultados
          comerciales específicos (ventas, leads, posicionamiento) ya que dependen de factores externos,
          operación, oferta, pauta, contenidos y mercado.
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">7. Limitación de responsabilidad</h2>
        <p className="text-[#8695A3]">
          En la medida permitida por la ley, Sigma AI Agency no será responsable por daños indirectos,
          lucro cesante o pérdidas derivadas del uso del sitio o de entregables, especialmente cuando
          intervengan terceros (hosting, proveedores de email, CRMs, APIs, pasarelas de pago).
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">8. Contacto</h2>
        <p className="text-[#8695A3]">
          Si tienes dudas sobre estos términos, contáctanos en{" "}
          <a className="text-[#003594] underline" href="mailto:contacto@sigmaaiagency.com">
            contacto@sigmaaiagency.com
          </a>
          .
        </p>

        <p className="pt-4 text-xs text-[#8695A3]">
          Última actualización: 2026-03-06.
        </p>
      </section>
    </main>
  );
}

