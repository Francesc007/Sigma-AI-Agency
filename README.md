# Sigma AI Agency – Landing Page

Landing profesional para **Sigma AI Agency** (agencia de automatización con IA para negocios en México), con animaciones Framer Motion y listo para Vercel.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** (scroll-reveal, hover, transiciones)
- **shadcn/ui** (Button, Card, Dialog, Input, etc.)
- **react-hook-form + Zod** (formularios → WhatsApp)
- **Vercel Analytics** + Google Analytics

## Desarrollo

```bash
npm install
npm run dev
npm run lint
npm run build
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Opcional: `NEXT_PUBLIC_SITE_URL` en `.env.local` para Open Graph / metadata.

## Contacto y formularios

Los formularios abren **WhatsApp** con los datos prellenados (`src/lib/whatsapp.ts`). No hay backend ni base de datos.

## Logo

El logo canónico del proyecto es **`public/logo_azul.png`**. Referenciado en navbar, footer y favicon.

## Estructura de la landing (homepage)

1. **Hero** – Video de fondo y CTAs principales
2. **ProblemSection** – Problema / propuesta de valor
3. **ServicesSection** – Servicios (`#servicios`)
4. **ProjectsSection** – Casos / proyectos (`#proyectos`)
5. **ForWhoSection** – Público objetivo
6. **PartnersLogoMarquee** – Logos de partners
7. **ReadyToTalkSection** – Formulario → WhatsApp
8. **Footer** – Contacto, redes y legales (`#contacto`)

**Navbar:** enlaces a secciones y **Cotizar Proyecto** (WhatsApp).

## Deploy en Vercel

1. Conecta el repo en [vercel.com](https://vercel.com).
2. Añade `NEXT_PUBLIC_SITE_URL` si quieres metadata OG correcta en producción.
3. Verifica formularios y metadata tras el deploy.

## Licencia

Privado – Sigma AI INC.
