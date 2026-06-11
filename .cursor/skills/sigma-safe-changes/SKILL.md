---
name: sigma-safe-changes
description: Reglas para cambiar Sigma AI Agency sin romper lo existente. Usar en cualquier tarea de código, refactor o nuevas features en este repo.
---

# Sigma AI – Cambios seguros y control de calidad

## Principio

Cada cambio = **analizar → diff mínimo → verificar → parar si algo falla**.

## Antes de editar

1. Leer archivos afectados (no asumir estructura del README antiguo).
2. Describir el cambio en 1–2 frases.
3. Identificar si toca: assets, navegación, layout global o solo una sección.

## Durante el cambio

- **Una cosa a la vez:** no montar varias secciones ni refactorizar múltiples componentes en el mismo paso.
- **No commitear** `.env.local` ni secretos (`.gitignore` incluye `.env*.local`).
- **Reutilizar** componentes y convenciones existentes (Tailwind, shadcn Button variants).
- **Rendimiento LCP:** imágenes en Hero o sección superior deben usar `priority` o `fetchPriority="high"` en `next/image`. Preferir WebP/AVIF cuando sea posible.
- **Logo en navbar:** `<Logo />` no tiene prop `variant`. Para contraste sobre fondo oscuro, pasar clases al icono vía `className` en [`LogoIcon`](../../src/components/ui/LogoIcon.tsx) desde [`NavbarBrand`](../../src/components/layout/NavbarBrand.tsx) según `scrolled` (ej. `brightness-0 invert` arriba, sin filtro al scroll). Ver skill `sigma-assets-public`.

## Después de editar

```bash
npm run lint
npm run build
```

Probar manualmente lo tocado (navbar, formulario WA, sección nueva).

## Áreas de alto riesgo

| Área | Precaución |
|------|------------|
| [`src/lib/whatsapp.ts`](../../src/lib/whatsapp.ts) | No cambiar número ni `WHATSAPP_DEFAULT_MESSAGE` sin confirmar |
| [`src/app/layout.tsx`](../../src/app/layout.tsx) | Afecta todas las páginas; cambios mínimos |
| [`src/app/page.tsx`](../../src/app/page.tsx) | Una sección por cambio |
| Assets en `public/` | Alinear todas las referencias al nombre canónico |

## Revertir

Si lint o build fallan tras un cambio, revertir **solo** ese diff antes de continuar.

## Skills relacionados

- `sigma-dev-workflow` — comandos y WhatsApp
- `sigma-assets-public` — logos e imágenes
- `sigma-homepage-sections` — orden de secciones
