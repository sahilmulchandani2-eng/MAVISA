# Prompt — Proyecto Mavisa (continuación)

## Proyecto
Tienda online Mavisa — ZOFRI, Iquique, Chile  
Carpeta local: `/Users/sahilmulchandani/Desktop/Claude/Projects/Web Mavisa`  
Repo GitHub: `sahilmulchandani2-eng/MAVISA`  
Deploy: Vercel (auto-deploy al hacer push a `main`)

---

## Stack
- HTML/CSS/JS puro, sin frameworks
- `index.html` — homepage
- `catalogo.html` — catálogo
- `producto.html` — detalle de producto
- `admin.html` — panel de administración
- `js/catalog.js` — productos + lógica de render
- `js/main.js` — helpers globales
- `css/style.css`, `css/animations.css`, `css/responsive.css`

---

## Flujo admin → frontend

1. Admin guarda productos en `localStorage` (`mavisa_admin_products`)
2. "Publicar al sitio" lee `catalog.js` de GitHub, reemplaza `PRODUCTS_DATA` y hace push vía GitHub API
3. **Publicar homepage** (`publishHomepage()`) lee `index.html` de GitHub, reemplaza los bloques marcados con `<!--BRANDS_START-->...<!--BRANDS_END-->` y `<!--HERO_START-->...<!--HERO_END-->` y hace push
4. Vercel redeploy en ~30 segundos

Push siempre con:
```bash
git add . && git commit -m "mensaje" && git pull --rebase origin main && git push origin main
```

Si hay lock files atascados (error frecuente desde el sandbox):
```bash
rm -f .git/index.lock .git/HEAD.lock && rm -rf .git/rebase-merge
```

---

## Lo que se implementó y corrigió en esta sesión

### Franja de marcas (index.html)
- **Loop infinito roto** → corregido matemáticamente: se usa `margin-right` en cada `.brand-logo` en vez de `gap` en el flex container. Así `-50%` cae exactamente al inicio del set 2. Fórmula: `N × (width + margin-right)` = total de un set, y `-50%` del total del track = exactamente un set.
- **Fotos opacas** → eliminado `opacity:0.75` y `filter:grayscale(30%)` de todos los logos (eran 14 imgs, corregido con `replace_all`)
- **Tamaños desiguales** → CSS actual: `.brand-logo { width:auto; height:auto; max-width:140px; max-height:52px; min-width:60px; min-height:32px; margin-right:88px; object-fit:contain; }`
- **GPU acceleration** → agregado `will-change:transform` al `#brands-track`

### `publishHomepage()` en admin.html
- **Bug crítico encontrado y corregido**: la función buscaba marcadores `<!--BRANDS_START-->` que NO existían en `index.html` → los logos del admin nunca llegaban al sitio
- **Fix aplicado**:
  1. Se agregaron los marcadores `<!--BRANDS_START-->` y `<!--BRANDS_END-->` dentro del `#brands-track` en `index.html`
  2. Se actualizó `publishHomepage()` para generar `<img class="brand-logo">` (en vez de `<div><img></div>`) y para duplicar automáticamente el set de logos (necesario para el loop infinito CSS)

### `autoCropTransparent()` en admin.html
- **Bug corregido**: la función creaba un canvas **cuadrado** (`Math.max(w, h)`) re-agregando espacio transparente arriba/abajo para logos horizontales como DSP → logos se achicaban más después de 🪄
- **Fix**: output rectangular exacto, sin padding de cuadrado

### Admin — preview de marcas
- Contenedor del preview agrandado de `90×40px` → `160×68px` con `height:56px` en la imagen

### remove.bg error
- Mejorado el mensaje de error: ahora muestra el código HTTP y detalle del error (ej: `402 - No credits`, `400 - URL not accessible`)

---

## Estado actual de la franja de marcas

Los logos en `index.html` están hardcodeados en el track Y controlados por los marcadores para el admin. Cada vez que se usa **🚀 Publicar homepage** desde el admin, el HTML del track se regenera con los logos actuales del localStorage, duplicados para el loop.

**Logos actuales** (en localStorage del admin, pendiente verificar que todos carguen):
- DSP, KEMEI, VGR, Sonifer, Starlux, BOMA, ACKILISS, Cosmos

**Problema pendiente**: logos con distinta proporción visual (Starlux/Kemei grandes vs. Sonifer/DSP chicos). Causa: los archivos PNG/JPG de algunos logos tienen mucho espacio transparente alrededor del logo real. La solución correcta es usar el botón **🪄** en cada logo desde el admin (después del fix de autoCropTransparent rectangular, ahora recorta correctamente sin achicar).

**Nota sobre remove.bg**: si aparece error `402`, significa que los créditos de la API están agotados (`REMOVEBG_KEY = 'SvHmgXeMMHLDsThSwKis1Xum'`). En ese caso hay que recargar créditos o usar una nueva key.

---

## Pendientes / próximos pasos

1. **Verificar que publishHomepage funciona** — después del fix de marcadores, presionar 🚀 en el admin y confirmar que los logos correctos aparecen en el sitio
2. **Normalizar tamaños de logos** — usar 🪄 en cada logo que se vea chico (VGR, Sonifer, DSP) para recortar espacio transparente. Con el fix de autoCrop rectangular ya no se achican
3. **Agregar logo Cosmos desde el admin** — el SVG está en `assets/images/brands/cosmos-innovation.svg`. Subirlo desde la sección 🏠 Homepage del admin
4. **Imágenes reales de productos** — actualmente tienen SVG placeholder
5. **Prueba completa del flujo** admin → publicar → verificar en sitio
6. **Logos con fondo negro (ACKILISS)** — aplicar 🪄 para eliminar el fondo negro si se quiere logo transparente

---

## Credenciales / Keys en el código

- `REMOVEBG_KEY = 'SvHmgXeMMHLDsThSwKis1Xum'`
- `GH_REPO = 'sahilmulchandani2-eng/MAVISA'`
- GitHub token guardado en localStorage del admin (`mavisa_gh_token`)
