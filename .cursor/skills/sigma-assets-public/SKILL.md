---
name: sigma-assets-public
description: Gestionar logos, favicon, OG e imágenes en public/ de Sigma AI Agency. Usar cuando haya 404 de assets o al añadir imágenes nuevas.
---

# Sigma AI – Assets en public/

## Convención canónica del logo

**Archivo:** `public/logo_azul.png`

Referencias obligatorias (no inventar nombres alternativos):

| Archivo | Uso |
|---------|-----|
| [`src/components/ui/LogoIcon.tsx`](../../src/components/ui/LogoIcon.tsx) | Logo en navbar/footer |
| [`src/app/layout.tsx`](../../src/app/layout.tsx) | Favicon (`icons.icon`) |
| [`src/app/globals.css`](../../src/app/globals.css) | Clase `.logo-mask-light` (mask-image) |

Open Graph usa `/sigma-ai.png` en [`layout.tsx`](../../src/app/layout.tsx).

## Control de color del PNG en navbar

El logo es un PNG a color. `<Logo />` / `<LogoIcon />` **no** tienen prop `variant`; el contraste se controla con `className` en la imagen.

Patrón recomendado en [`NavbarBrand`](../../src/components/layout/NavbarBrand.tsx) según `scrolled`:

- **Navbar transparente (tope):** `brightness-0 invert` en el `<Image>` del logo → blanco sobre hero oscuro.
- **Navbar sólido (scroll):** sin filtro → colores originales azul/plata sobre fondo blanco.
- **Footer:** colores originales; fondo `#003594` — ajustar contraste con contenedor o resplandor si hace falta.

Estado actual: [`LogoIcon.tsx`](../../src/components/ui/LogoIcon.tsx) muestra el PNG sin filtros por defecto. Aplicar el patrón anterior solo si el contraste en navbar lo requiere.

## Reglas al añadir assets

1. Colocar archivos en `public/` (servidos desde `/nombre.ext`)
2. Respetar nombres exactos si ya existen espacios (ej. `Logo Face.png`)
3. Tras cambiar referencias: `npm run build` y comprobar cero 404 en Network
4. No commitear assets generados localmente salvo acuerdo del equipo

## Rendimiento LCP

- Imágenes del Hero: `priority` / `fetchPriority="high"` en `next/image`
- [`LogoIcon.tsx`](../../src/components/ui/LogoIcon.tsx) ya usa `priority` y `fetchPriority="high"`

## Componentes con assets no montados

[`InfiniteCarousel.tsx`](../../src/components/ui/InfiniteCarousel.tsx) referencia `/images/*` inexistentes. Solo corregir si se monta ese componente.
