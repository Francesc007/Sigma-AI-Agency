---
name: sigma-dev-workflow
description: Arrancar, verificar build/lint y probar formularios WhatsApp en Sigma AI Agency (Next.js 16). Usar al desarrollar o depurar contacto.
---

# Sigma AI – Flujo de desarrollo

## Comandos

Desde la raíz del repo:

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint (Next 16 ya no usa next lint)
npm run build
npm run start    # producción local
```

**Ritual antes/después de cambiar código:** `npm run lint && npm run build`

## Variables de entorno

Opcional: `NEXT_PUBLIC_SITE_URL` en `.env.local` para Open Graph (reiniciar dev tras cambiar).

## Contacto vía WhatsApp

Lógica centralizada en [`src/lib/whatsapp.ts`](../../src/lib/whatsapp.ts):

| Export | Uso |
|--------|-----|
| `WHATSAPP_NUMBER` | `525554590883` |
| `WHATSAPP_DEFAULT_MESSAGE` | Texto fijo para CTAs directos (navbar, flotante) |
| `buildWhatsAppUrl(text)` | URL `wa.me` |
| `buildProjectInquiryMessage(data)` | Mensaje default + datos del formulario |
| `openWhatsApp(text)` | Abre en nueva pestaña |

**Mensaje default (no cambiar sin confirmar):**

> Hola, vi la página de Sigma AI y me interesa una auditoría de automatización para mi negocio.

**CTAs directos:** [`Navbar.tsx`](../../src/components/layout/Navbar.tsx), [`WhatsAppFloating.tsx`](../../src/components/layout/WhatsAppFloating.tsx) → solo `WHATSAPP_DEFAULT_MESSAGE`.

**Formulario activo:** [`ReadyToTalkSection`](../../src/components/home/ReadyToTalkSection.tsx) → valida campos y abre WA con mensaje default + nombre, email, teléfono y proyecto.

Componentes legacy (no montados): `DemoForm`, `SubscribeSection`.

**No hay API `/api/leads` ni Supabase.**

## ESLint (Next 16)

- Config: [`eslint.config.mjs`](../../eslint.config.mjs)
- Script: `"lint": "eslint ."` en [`package.json`](../../package.json)

## Rutas de la app

| Ruta | Tipo |
|------|------|
| `/` | Landing |
| `/privacidad`, `/terminos` | Legales |
