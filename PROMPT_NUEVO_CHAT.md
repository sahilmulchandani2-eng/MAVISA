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
2. **Publicar al sitio** → lee `catalog.js` de GitHub, reemplaza `PRODUCTS_DATA` y hace push vía GitHub API
3. **Publicar homepage** (`publishHomepage()`) → lee `index.html` de GitHub, reemplaza bloques con marcadores:
   - `<!--BRANDS_START-->...<!--BRANDS_END-->` → franja de marcas (genera `<img class="brand-logo">` duplicado para loop)
   - Hero slides también se actualizan
4. Vercel redeploy en ~30 segundos

Push siempre con:
```bash
git add . && git commit -m "mensaje" && git pull --rebase origin main && git push origin main
```

Si hay lock files atascados (pasa seguido desde el sandbox):
```bash
rm -f .git/index.lock .git/HEAD.lock && rm -rf .git/rebase-merge
```

---

## Credenciales / Keys

- `REMOVEBG_KEY = 'SvHmgXeMMHLDsThSwKis1Xum'`
- `GH_REPO = 'sahilmulchandani2-eng/MAVISA'`
- GitHub token guardado en `localStorage` del admin (`mavisa_gh_token`)

---

## Lo que se implementó y corrigió (historial completo)

### Franja de marcas — index.html
- **Loop infinito** → corregido con `margin-right` en cada `.brand-logo` en vez de `gap` en el flex. Fórmula exacta: `N × (width + margin-right)` = un set, `-50%` del total = un set exacto
- **Opacidad/grayscale** → eliminados `opacity:0.75` y `filter:grayscale(30%)` de los 14 imgs
- **GPU** → `will-change:transform` en `#brands-track`
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

### publishHomepage() — admin.html
- **Bug crítico corregido**: buscaba `<!--BRANDS_START-->` que no existía → los logos del admin nunca llegaban al sitio
- **Fix**: marcadores agregados en `index.html` dentro del `#brands-track`, y `publishHomepage()` genera `<img class="brand-logo">` duplicado automáticamente para el loop infinito

### autoCropTransparent() — admin.html
- **Bug corregido**: creaba canvas **cuadrado** re-agregando espacio transparente para logos horizontales
- **Fix**: output rectangular exacto sin padding de cuadrado

### Admin — preview de marcas
- Contenedor agrandado de `90×40px` → `160×68px`

### remove.bg error handling
- Mejorado para mostrar código HTTP real (402 = sin créditos, 400 = URL inaccesible)

### Limpieza de imágenes
- Eliminados ~5MB de archivos huérfanos: carpeta `imagenes/` vieja, 14 productos sin usar, favicons duplicados, `logo.svg`, categorías sin `-v3`

### Categorías — index.html
- **Nuevas imágenes** agregadas: `barberia-v3.png`, `mascotas-v3.png`, `salud-v3.png`, `herramientas-v3.png`
- **Fix de zoom**: cambiado de `width/height %` (no funcionaba predeciblemente en flex) a `transform:scale()` que da control real y directo
- **Escala actual de cada categoría:**
  - Electrodomésticos: `scale(1.05)`
  - Belleza: `scale(1.10)`
  - Barbería: `scale(1.20)`
  - Hobbies: `scale(1.15)`
  - Mascotas: `scale(1.51)`
  - Salud: `scale(1.05)`

---

## Estado actual de imágenes en assets/images/categories/
```
barberia-v3.png      ← nueva, en uso
belleza-v3.png       ← en uso
electrodomesticos-v3.png ← en uso
hobbies-v3.png       ← en uso
mascotas-v3.png      ← nueva, en uso
salud-v3.png         ← nueva, en uso
herramientas-v3.png  ← nueva, SIN tarjeta en index.html todavía
hobbies.png          ← duplicado viejo (pendiente borrar)
```

---

## Pendientes / próximos pasos

1. **Ajustar escala de Salud y Hobbies** — pendiente revisión visual, solo se ajustaron Barbería y Mascotas hasta ahora
2. **Agregar tarjeta de Herramientas** — imagen `herramientas-v3.png` lista, falta agregar la `<a class="category-card">` en index.html
3. **Franja de marcas — verificar publicación** — después del fix de marcadores, confirmar que 🚀 Publicar homepage actualiza correctamente los logos
4. **Logos pequeños (DSP, VGR, Sonifer)** — usar 🪄 en el admin para recortar espacio transparente. Con el fix de autoCrop rectangular ya no se achican
5. **Agregar logo Cosmos** — subir desde admin 🏠 Homepage (SVG está en `assets/images/brands/cosmos-innovation.svg`)
6. **Imágenes reales de productos** — actualmente placeholders SVG
7. **Borrar `hobbies.png`** — duplicado viejo sin usar en categories/

---

## Nota importante sobre el sandbox
El sandbox de Claude tiene restricciones de permisos para borrar archivos y a veces para hacer git push. Siempre que falle un `rm` o un `git push`, correrlo directamente desde la terminal del Mac del usuario.
