---
name: sigma-ui-effect-blockers
description: Diagnostica por qué un efecto UI (sticky, scroll, apilado, animaciones) no funciona o se comporta mal en Sigma AI Agency. Usar cuando position sticky no ancla, hay scroll horizontal, saltos al hacer scroll, componentes que se empujan entre sí, o antes de reemplazar CSS nativo por JavaScript fixed/transform.
---

# Sigma AI – Efectos UI bloqueados o rotos

## Cuándo usar

- `position: sticky` no ancla o la tarjeta sigue scrolleando.
- Aparece scroll horizontal / franja blanca a la derecha en móvil.
- Efectos de apilado (StackingCards) con saltos, empujes o solapamiento desde el inicio.
- Antes de añadir `position: fixed` + listeners de scroll como parche.

## Checklist de bloqueadores (orden de revisión)

### 1. Overflow en ancestros (causa #1 de sticky roto)

En móvil, revisar [`globals.css`](../../src/app/globals.css):

```css
@media (max-width: 1023px) {
  html, body, #main-content { overflow-x: ??? }
}
```

| Valor | Efecto |
|-------|--------|
| `hidden` | Crea scroll container → **rompe `position: sticky`** respecto al viewport |
| `clip` | Recorta desbordamiento horizontal **sin** romper sticky → usar este |
| `visible` | Sticky OK; puede haber scroll horizontal si un hijo desborda |

**Regla:** nunca `overflow-x: hidden` en `html`, `body` o `#main-content` si la sección usa sticky/apilado.

### 2. Stacking Cards (Soluciones / Proyectos móvil)

Archivo: [`StackingCards.tsx`](../../src/components/home/StackingCards.tsx)

Patrón correcto (Mercado Pago):

- Contenedor = track de scroll (altura natural de cartas + `endSpacerVh`).
- Cada carta: `position: sticky` + top progresivo + `z-index` incremental.
- Top: `calc(var(--navbar-height) + var(--stack-first-gap) + index * var(--stack-offset))`.
- Variables en `:root` de `globals.css`: `--navbar-height`, `--stack-first-gap`, `--stack-offset`.
- Profundidad: Framer `useScroll` + `useTransform` (scale/opacity), no JS de pin salvo que sticky siga imposible.

**No usar** en paralelo: `position: fixed` manual, `hold`, tracks `100vh` artificiales, `marginTop` negativo agresivo, `justify-end` que oculte cartas.

### 3. Secciones con `overflow-visible` vs `overflow-hidden`

Soluciones/Proyectos en móvil necesitan `overflow-visible` en la `<section>` para que sticky funcione. En desktop (`lg:`) puede volver `overflow-hidden`.

### 4. Navbar y ancla sticky

`--navbar-height` debe coincidir con la altura real del navbar (88px / 72px con `html.navbar-scrolled`). Ver [`Navbar.tsx`](../../src/components/layout/Navbar.tsx).

### 5. Antes de parchear con JS

1. Confirmar sticky nativo con `overflow-x: clip`.
2. Ajustar `--stack-first-gap` y `--stack-offset` en CSS.
3. Ajustar `endSpacerVh` en la sección, no reescribir toda la lógica.

## Flujo de diagnóstico

```
Síntoma → ¿overflow-x hidden en ancestro? → clip
       → ¿sticky en StackingCards? → revertir fixed/JS
       → ¿top/z-index progresivos? → globals.css vars
       → ¿track suficiente? → endSpacerVh / altura natural
       → Probar en móvil real (IP local)
```

## Ritual de cierre

```bash
npm run lint && npm run build
```

Probar scroll en Soluciones (3 cartas) antes de tocar Proyectos o navbar.

## Áreas relacionadas

| Archivo | Rol |
|---------|-----|
| `globals.css` | overflow-x, vars de stack y navbar |
| `StackingCards.tsx` | apilado móvil |
| `ServicesSection.tsx` / `ProjectsSection.tsx` | montaje `< lg` |
| `layout.tsx` / `#main-content` | contenedor global |
