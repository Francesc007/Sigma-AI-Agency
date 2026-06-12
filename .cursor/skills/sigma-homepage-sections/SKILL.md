---
name: sigma-homepage-sections
description: Gestión y orden de las secciones activas en la homepage (page.tsx). Usar al modificar page.tsx o montar componentes home.
---

# Sigma AI – Secciones de la homepage

## Punto de montaje

Todas las secciones activas se importan en [`src/app/page.tsx`](../../src/app/page.tsx).

## Orden actual

1. `Hero` — `#inicio`
2. `ProblemSection`
3. `ServicesSection` — `#servicios`
4. `ProjectsSection` — `#proyectos`
5. `ForWhoSection` — `#para-quien-es-esto` (sin imagen de fondo)
6. `PartnersLogoMarquee` — carrusel de logos, encima del footer

Footer global en [`layout.tsx`](../../src/app/layout.tsx) con `#contacto`.

## Legacy (no montados)

- `ReadyToTalkSection` — formulario WhatsApp (retirado de la homepage)

## Navbar y acciones

Enlaces: `#servicios`, `#proyectos`, `#contacto`.

- **Cotizar Proyecto** → WhatsApp con `WHATSAPP_DEFAULT_MESSAGE` (ver [`src/lib/whatsapp.ts`](../../src/lib/whatsapp.ts))
- No hay modal de demo ni formulario en el navbar

## Componentes home no montados (legacy)

Disponibles en `src/components/home/` pero fuera de la homepage:
- `AgencySection`, `SectorsSection`, `TestimonialsSection`, `InsightsSection`, `SubscribeSection`

## Protocolo para montar una sección

1. Leer el componente y sus dependencias (Framer, Recharts, imágenes)
2. Añadir **una** import + JSX en `page.tsx`
3. `npm run dev` → revisar visual y consola
4. `npm run lint && npm run build`
5. Si falla → revertir solo ese cambio
