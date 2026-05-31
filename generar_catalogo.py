#!/usr/bin/env python3
"""
MAVISA — Generador de catálogo
Uso: python generar_catalogo.py

Lee plantilla_productos.xlsx, copia las fotos desde fotos_productos/
y genera js/catalog.js listo para el sitio.
"""

import os, re, shutil, json, sys
from pathlib import Path

try:
    import openpyxl
except ImportError:
    print("Instalando openpyxl...")
    os.system(f"{sys.executable} -m pip install openpyxl --break-system-packages -q")
    import openpyxl

BASE      = Path(__file__).parent
EXCEL     = BASE / "plantilla_productos.xlsx"
FOTOS_IN  = BASE / "fotos_productos"
FOTOS_OUT = BASE / "assets" / "images" / "products"
CATALOG   = BASE / "js" / "catalog.js"

CATEGORIES = {
    "Electrodomésticos":  "electrodomesticos",
    "Tecnología Hogar":   "tecnologia-hogar",
    "Gadgets":            "gadgets",
    "Belleza":            "belleza",
    "Juguetes":           "juguetes",
}

def slug(text):
    text = text.lower().strip()
    text = re.sub(r"[áàä]","a", text)
    text = re.sub(r"[éèë]","e", text)
    text = re.sub(r"[íìï]","i", text)
    text = re.sub(r"[óòö]","o", text)
    text = re.sub(r"[úùü]","u", text)
    text = re.sub(r"ñ","n", text)
    text = re.sub(r"[^a-z0-9]+","-", text)
    return text.strip("-")

def yes(val):
    return str(val).strip().lower() in ("sí","si","yes","true","1","x")

def money(val):
    try:
        return int(str(val).replace(".","").replace(",","").strip())
    except:
        return None

def cell(row, col):
    v = row[col - 1] if col - 1 < len(row) else None
    return str(v).strip() if v is not None and str(v).strip() not in ("", "None") else ""

# ── Load Excel ────────────────────────────────────────────────
if not EXCEL.exists():
    print(f"ERROR: No encuentro {EXCEL}")
    sys.exit(1)

wb = openpyxl.load_workbook(EXCEL, data_only=True)
ws = wb["Productos"]

# ── Prepare output folder for images ──────────────────────────
FOTOS_OUT.mkdir(parents=True, exist_ok=True)

products   = []
errors     = []
counter    = 1
copied     = 0
missing    = []

rows = list(ws.iter_rows(min_row=3, values_only=True))

for ri, raw in enumerate(rows, start=3):
    # Skip empty rows
    if not any(v for v in raw if v is not None):
        continue

    nombre = cell(raw, 2)
    if not nombre:
        continue

    # ID
    pid = cell(raw, 1) or f"p{counter:03d}"
    counter += 1

    # Category
    cat_label = cell(raw, 3)
    cat_slug  = CATEGORIES.get(cat_label, slug(cat_label) if cat_label else "otros")

    # Prices
    precio     = money(cell(raw, 4))
    precio_old = money(cell(raw, 5))

    if not precio:
        errors.append(f"Fila {ri}: '{nombre}' no tiene precio — OMITIDA")
        continue

    # Badge
    badge_val   = cell(raw, 6).lower()
    badge_label = cell(raw, 7)
    if badge_val not in ("hot","sale","new",""):
        badge_val = ""

    # Description
    desc = cell(raw, 8) or nombre

    # Image
    img_file = cell(raw, 9)
    if img_file:
        src = FOTOS_IN / img_file
        if src.exists():
            dst = FOTOS_OUT / img_file
            if not dst.exists() or src.stat().st_mtime > dst.stat().st_mtime:
                shutil.copy2(src, dst)
                copied += 1
            img_path = f"assets/images/products/{img_file}"
        else:
            missing.append(f"Fila {ri}: foto '{img_file}' no encontrada en fotos_productos/")
            img_path = "assets/images/placeholder.svg"
    else:
        img_path = "assets/images/placeholder.svg"

    # Specs (columns 10-19, pairs)
    specs = []
    for si in range(5):
        lbl = cell(raw, 10 + si * 2)
        val = cell(raw, 11 + si * 2)
        if lbl and val:
            specs.append({"label": lbl, "value": val})

    # Flags
    featured = yes(cell(raw, 20))
    is_new   = yes(cell(raw, 21))
    in_stock = cell(raw, 22)
    in_stock = not (in_stock.lower() in ("no","false","0")) if in_stock else True

    prod = {
        "id":           pid,
        "name":         nombre,
        "category":     cat_label or "Otros",
        "categorySlug": cat_slug,
        "price":        precio,
        "description":  desc,
        "image":        img_path,
        "images":       [img_path],
        "featured":     featured,
        "isNew":        is_new,
        "inStock":      in_stock,
    }
    if precio_old and precio_old > precio:
        prod["priceOld"] = precio_old
    if badge_val:
        prod["badge"]      = badge_val
        prod["badgeLabel"] = badge_label or badge_val
    if specs:
        prod["specs"] = specs

    products.append(prod)

# ── Generate JS ───────────────────────────────────────────────
def to_js(obj, indent=2):
    """Convert Python dict to JS object literal (not JSON — unquoted keys)."""
    pad  = " " * indent
    pad2 = " " * (indent + 2)
    lines = ["{"]
    items = list(obj.items())
    for i, (k, v) in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        if isinstance(v, bool):
            lines.append(f"{pad2}{k}: {'true' if v else 'false'}{comma}")
        elif isinstance(v, int):
            lines.append(f"{pad2}{k}: {v}{comma}")
        elif isinstance(v, list):
            if not v:
                lines.append(f"{pad2}{k}: []{comma}")
            elif isinstance(v[0], dict):
                inner = []
                for item in v:
                    inner.append("      " + to_js(item, indent + 4))
                lines.append(f"{pad2}{k}: [\n" + ",\n".join(inner) + f"\n{pad2}]{comma}")
            else:
                vals = ", ".join(f"'{x}'" for x in v)
                lines.append(f"{pad2}{k}: [{vals}]{comma}")
        elif isinstance(v, str):
            safe = v.replace("'", "\\'")
            lines.append(f"{pad2}{k}: '{safe}'{comma}")
        else:
            lines.append(f"{pad2}{k}: {json.dumps(v)}{comma}")
    lines.append(pad + "}")
    return "\n".join(lines)

# Read existing catalog.js to preserve logic after PRODUCTS_DATA
existing = CATALOG.read_text(encoding="utf-8") if CATALOG.exists() else ""
# Find where PRODUCTS_DATA ends (after the closing ];)
split_marker = "];"
data_end = existing.find(split_marker)
if data_end != -1:
    logic_part = existing[data_end + len(split_marker):]
else:
    logic_part = ""

# Build products block
prod_lines = []
for p in products:
    prod_lines.append("  " + to_js(p, 2))

products_block = "const PRODUCTS_DATA = [\n"
products_block += ",\n".join(prod_lines)
products_block += "\n];"

header = """\
/* ============================================================
   MAVISA — Products Data & Catalog Logic
   Auto-generado por generar_catalogo.py — no editar a mano
   ============================================================ */

'use strict';

/* ── Products Database ────────────────────────────────────── */
"""

CATALOG.write_text(header + products_block + logic_part, encoding="utf-8")

# ── Report ────────────────────────────────────────────────────
print(f"\n{'='*50}")
print(f"  MAVISA — Catálogo generado correctamente")
print(f"{'='*50}")
print(f"  Productos cargados : {len(products)}")
print(f"  Fotos copiadas     : {copied}")
if missing:
    print(f"\n  ⚠️  Fotos no encontradas ({len(missing)}):")
    for m in missing:
        print(f"     {m}")
if errors:
    print(f"\n  ❌ Filas con errores ({len(errors)}):")
    for e in errors:
        print(f"     {e}")
print(f"\n  ✅ Archivo generado: js/catalog.js")
print(f"{'='*50}\n")
