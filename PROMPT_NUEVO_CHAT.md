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

## Credenciales / Keys
- `REMOVEBG_KEY = 'SvHmgXeMMHLDsThSwKis1Xum'`
- `GH_REPO = 'sahilmulchandani2-eng/MAVISA'`
- GitHub token guardado en `localStorage` del admin (`mavisa_gh_token`)

---

## Flujo admin → frontend

1. Admin guarda productos en `localStorage` (`mavisa_admin_products`)
2. **Publicar al sitio** → lee `catalog.js` de GitHub, reemplaza `PRODUCTS_DATA` y hace push vía GitHub API
3. **Publicar homepage** (`publishHomepage()`) → lee `index.html` de GitHub, reemplaza bloques con marcadores:
   - `<!--BRANDS_START-->...<!--BRANDS_END-->` → franja de marcas (genera `<img class="brand-logo">` duplicado para loop infinito)
   - `<!--CHIPS_START-->...<!--CHIPS_END-->` → burbujas flotantes del hero
   - Hero slides también se actualizan
4. Vercel redeploy en ~30 segundos

Push siempre desde terminal del Mac con:
```bash
git add . && git commit -m "mensaje" && git pull --rebase origin main && git push origin main
```

Si hay lock files atascados (pasa desde el sandbox de Claude):
```bash
rm -f .git/index.lock .git/HEAD.lock && rm -rf .git/rebase-merge
```

---

## Lo que se implementó y corrigió (historial completo)

### Franja de marcas — index.html
- **Loop infinito**: usa `margin-right` en cada `.brand-logo` (no `gap` en flex). Fórmula: `N × (width + margin-right)` = un set, `-50%` del track = exactamente un set → loop perfecto
- **Opacidad/grayscale eliminados**: quitados `opacity:0.75` y `filter:grayscale(30%)`
- **GPU**: `will-change:transform` en `#brands-track`
- **CSS actual de logos:**
```css
.brand-logo {
  width: auto; height: auto;
  max-width: 140px; max-height: 52px;
  min-width: 60px; min-height: 32px;
  margin-right: 88px;
  object-fit: contain;
  opacity: 1; filter: none;
}
```
- Marcadores `<!--BRANDS_START-->...<!--BRANDS_END-->` en `#brands-track`

### publishHomepage() — admin.html
- **Bug corregido**: buscaba marcadores que no existían → logos del admin nunca llegaban al sitio
- **Fix**: marcadores agregados en `index.html`, función genera `<img class="brand-logo">` duplicado para loop infinito automáticamente

### autoCropTransparent() — admin.html
- **Bug corregido**: creaba canvas cuadrado re-agregando espacio transparente para logos horizontales
- **Fix**: output rectangular exacto

### Hero carousel — index.html + style.css
- `.hero-slide`: `position:absolute; inset:0; opacity:0; transform:scale(0.92); transition:opacity 0.6s ease, transform 0.6s ease; pointer-events:none; overflow:hidden;`
- Imagen del producto: `position:absolute; top:8px; left:50%; transform:translateX(-50%); width:230px; height:205px; object-fit:contain;`
- Nombre: `position:absolute; bottom:34px; width:100%; text-align:center`
- Precio: `position:absolute; bottom:10px; width:100%; text-align:center`
- **URL upload en admin**: función `heroUrlApply(i)` → toma URL, corre remove.bg, sube a GitHub, actualiza preview

### Burbujas flotantes (chips) — index.html + admin.html
- Posiciones: top-left `top:10px;left:-95px`, bottom-left `bottom:30px;left:-95px`, top-right `top:10px;right:-95px`, bottom-right `bottom:30px;right:-95px`
- Marcadores `<!--CHIPS_START-->...<!--CHIPS_END-->` para edición desde admin
- Admin renderiza 4 filas con emoji, nombre, precio por burbuja
- `DEFAULT_CHIPS` con 4 chips predeterminados; guardados en `localStorage` (`mavisa_homepage`)

### Categorías — index.html
- **Fix de zoom**: cambiado de `width/height %` a `transform:scale()` (control real en flex)
- **Escala actual:**
  - Electrodomésticos: `scale(1.05)`
  - Belleza: `scale(1.10)`
  - Barbería: `scale(1.20)`
  - Hobbies: `scale(1.15)`
  - Mascotas: `scale(1.29)`
  - Salud: `scale(1.29)`
- **Nuevas imágenes**: `barberia-v3.png`, `mascotas-v3.png`, `salud-v3.png`, `herramientas-v3.png`

### Admin UI — admin.html
- Sidebar: "Apariencia", "Portada del sitio", "Exportar respaldo"
- "GitHub Token" → "Clave de acceso"
- Interfaz simplificada para usuarios 20-65 años, no técnicos
- Banner de 3 pasos de guía eliminado (el dueño lo explica personalmente)
- Preview de logos: contenedor agrandado a `160×68px`
- remove.bg: error muestra código HTTP real (402 = sin créditos, 400 = URL inaccesible)

### Imágenes de productos — móvil
- **Bug corregido**: regla CSS `.product-card-image img[style*="opacity"] { display: none !important; }` en `@media (max-width: 768px)` ocultaba todas las imágenes porque el JS les agrega `opacity` inline
- **Fix**: regla eliminada de `css/style.css`

### Limpieza de imágenes
- Eliminados ~5MB de archivos huérfanos: carpeta `imagenes/` vieja, 14 productos sin usar, favicons duplicados, `logo.svg`, categorías sin `-v3`

---

## Estado actual de imágenes en assets/images/categories/
```
barberia-v3.png         ← en uso
belleza-v3.png          ← en uso
electrodomesticos-v3.png ← en uso
hobbies-v3.png          ← en uso
mascotas-v3.png         ← en uso
salud-v3.png            ← en uso
herramientas-v3.png     ← SIN tarjeta en index.html todavía
hobbies.png             ← duplicado viejo (pendiente borrar)
```

---

## Pendientes / próximos pasos

1. **Agregar tarjeta de Herramientas** — imagen `herramientas-v3.png` lista, falta agregar la `<a class="category-card">` en index.html
2. **Logos pequeños (DSP, VGR, Sonifer)** — usar 🪄 en admin para recortar espacio transparente (autoCrop rectangular ya corregido)
3. **Agregar logo Cosmos** — subir desde admin 🏠 Homepage
4. **Imágenes reales de productos** — actualmente placeholders SVG en varios productos
5. **Borrar `hobbies.png`** — duplicado viejo sin usar en categories/

---

## Nota sobre el sandbox de Claude
El sandbox tiene restricciones para borrar archivos y a veces para git push. Si falla un `rm` o `git push`, correrlo directamente desde la terminal del Mac.
