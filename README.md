# Sigma AI Agency – Landing Page

Landing ultra-profesional para **Sigma AI Agency** (agencia de automatización con IA para negocios en México), con tema Dallas Cowboys, animaciones Framer Motion y listo para Vercel.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** (scroll-reveal, hover, transiciones)
- **shadcn/ui** (Button, Card, Dialog, Input, etc.)
- **lucide-react** (iconos)
- **react-hook-form + Zod** (formularios)
- **Recharts** (gráficos interactivos en sectores)
- **Supabase** (leads)
- **Vercel Analytics** (opcional)

## Colores (Dallas Cowboys)

| Uso       | Hex       |
|----------|-----------|
| Primary  | `#003594` (Cowboys Blue) |
| Secondary| `#C6CFCB` (Cowboys Silver) |
| Accent   | `#41A62A` (Cowboys Green) |
| Bg       | `#FFFFFF` / `#F5F5F5` |
| Text sec | `#8695A3` |

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Logo (Logo Azul)

Para usar tu **Logo Azul** en la página:

1. Copia el archivo desde  
   **`C:\Users\Francisco OC\OneDrive\Documentos\Sigma IA Agency\Imágenes\Logos Sigma IA Agency`**  
   (el que se llame "Logo Azul" o similar, .png o .svg) a **`public/logo-azul.png`** (si es PNG) o renómbralo a `logo-azul.png` / `logo-azul.svg` según corresponda.
2. O ejecuta desde la raíz del proyecto:  
   **`.\scripts\copy-logo.ps1`**  
   (intenta copiar automáticamente desde la carpeta de logos).
3. Si no existe `public/logo-azul.png`, se muestra el triángulo azul (SVG) como fallback.

## Supabase (leads)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En el SQL Editor ejecuta el script **`supabase-leads.sql`** (crea la tabla `leads` y políticas RLS).
3. Copia `.env.example` a **`.env.local`** y rellena:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Los formularios "Agendar Demo", "Enviar Demo" (Ready to Talk) y "Suscríbete" envían a `POST /api/leads` y se guardan en Supabase (o se registran en consola si faltan las variables).

## Deploy en Vercel

1. Sube el repo a GitHub y conecta el proyecto en [vercel.com](https://vercel.com).
2. Añade las variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Opcional: `NEXT_PUBLIC_SITE_URL` con la URL final para Open Graph.

Vercel Analytics se habilita desde el dashboard del proyecto.

## Estructura de la landing

1. **Navbar** – Logo, enlaces (Automatización, No-Code, Consultoría IA, Financiamiento IA), "Llamar" y "Agendar Demo" (modal).
2. **Hero** – 100vh, gradiente Cowboys, título, búsqueda con dropdown, CTAs Demo / Ver Casos.
3. **Nuestra Agencia** – Misión, Visión, Experiencia (stats animados).
4. **Servicios Destacados** – Grid 2x2: Automatización, Chatbots, No-Code, Consultoría.
5. **Sectores** – Tabs E-commerce, Manufactura, Servicios, Fintech con gráficos Recharts.
6. **Testimonios** – Carrusel de clientes.
7. **Ready to Talk** – Formulario de contacto (nombre, email, tel, mensaje).
8. **Insights** – Grid de 3 artículos con "Leer Más" y acciones.
9. **Subscribe** – Email + botón Suscríbete.
10. **Footer** – Careers, Sigma con tu Negocio, redes (LinkedIn, WhatsApp), políticas, Secure Encryption, © 2026 Sigma AI INC.

## Licencia

Privado – Sigma AI INC.
