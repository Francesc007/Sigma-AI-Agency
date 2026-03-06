export const metadata = {
  title: "Aviso / Política de privacidad | Sigma AI Agency",
  description: "Aviso de privacidad y política de tratamiento de datos de Sigma AI Agency.",
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#003594]">Aviso de Privacidad</h1>
      <p className="mt-4 text-[#8695A3]">
        En Sigma AI Agency respetamos tu privacidad. Este aviso describe qué datos recopilamos, cómo los
        usamos y cómo los protegemos cuando visitas nuestro sitio o envías un formulario.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-[#003594]">1. Datos que recopilamos</h2>
        <p className="text-[#8695A3]">
          Podemos recopilar: nombre (opcional), correo electrónico, teléfono/WhatsApp (si lo proporcionas),
          y el mensaje o descripción del proyecto. También podemos registrar información técnica básica de
          navegación (p. ej. tipo de dispositivo) para fines de analítica.
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">2. Finalidades</h2>
        <p className="text-[#8695A3]">
          Usamos tus datos para: (a) responder solicitudes de contacto y cotización, (b) coordinar
          consultorías/demos, (c) enviar actualizaciones informativas si te suscribes a nuestra lista
          (tendencias, cambios del mercado, automatización), y (d) mejorar el sitio y nuestros servicios.
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">3. Compartición con terceros</h2>
        <p className="text-[#8695A3]">
          Podemos usar proveedores para operar el sitio y comunicaciones (p. ej. email y almacenamiento de
          leads). Solo compartimos datos cuando es necesario para brindar el servicio y bajo medidas
          razonables de seguridad.
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">4. Seguridad</h2>
        <p className="text-[#8695A3]">
          Implementamos medidas técnicas y organizativas para proteger tu información. Nuestro sitio usa
          cifrado en tránsito (SSL/TLS) cuando está disponible en el entorno de despliegue.
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">5. Conservación</h2>
        <p className="text-[#8695A3]">
          Conservamos la información el tiempo necesario para atender tu solicitud y/o mantener relación
          comercial, o según obligaciones legales. Puedes solicitar la eliminación cuando aplique.
        </p>

        <h2 className="text-xl font-semibold text-[#003594]">6. Derechos y contacto</h2>
        <p className="text-[#8695A3]">
          Puedes solicitar acceso, corrección o eliminación de tu información escribiendo a{" "}
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

