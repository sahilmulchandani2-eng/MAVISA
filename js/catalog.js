/* ============================================================
   MAVISA — Products Data & Catalog Logic
   Exportado desde el Panel de Administración
   Fecha: 31-05-2026
   ============================================================ */

'use strict';

/* ── Products Database ────────────────────────────────────── */
const PRODUCTS_DATA = [
  {
    id: 'p018',
    name: 'Kit Robótica Educativa Programable',
    category: 'Juguetes',
    categorySlug: 'juguetes',
    price: 89990,
    priceOld: null,
    badge: 'new',
    badgeLabel: 'Nuevo',
    description: 'Kit STEM de robótica con más de 200 piezas, compatible con programación visual (Scratch) y Python. Ideal para niños de 8 a 14 años. Incluye sensores y motores.',
    specs: [
      {
        label: 'Piezas',
        value: '200+'
      },
      {
        label: 'Edad',
        value: '8–14 años'
      },
      {
        label: 'Programación',
        value: 'Scratch / Python'
      },
      {
        label: 'Conectividad',
        value: 'Bluetooth'
      },
      {
        label: 'Incluye',
        value: 'App gratuita'
      }
    ],
    image: 'assets/images/robot-kit.svg',
    images: [
      'assets/images/robot-kit.svg'
    ],
    featured: true,
    isNew: false,
    inStock: true
  },
  {
    id: 'p016',
    name: 'Rizador Automático Inteligente',
    category: 'Belleza',
    categorySlug: 'belleza',
    price: 54990,
    priceOld: null,
    badge: 'new',
    badgeLabel: 'Nuevo',
    description: 'Rizador automático con cámara de cerámica, motor rotacional bidireccional, timer ajustable y 6 tamaños de rizo. Calentamiento en 10 segundos.',
    specs: [
      {
        label: 'Barril',
        value: 'Cerámica 32mm'
      },
      {
        label: 'Temperatura',
        value: '130–230°C'
      },
      {
        label: 'Timer',
        value: '8–18 seg.'
      },
      {
        label: 'Dirección',
        value: 'Bidireccional auto'
      },
      {
        label: 'Calentamiento',
        value: '10 segundos'
      }
    ],
    image: 'assets/images/rizador.svg',
    images: [
      'assets/images/rizador.svg'
    ],
    featured: true,
    isNew: false,
    inStock: true
  },
  {
    id: 'p003',
    name: 'Lavadora Carga Frontal 10kg Inverter',
    category: 'Electrodomésticos',
    categorySlug: 'electrodomesticos',
    price: 449990,
    priceOld: null,
    badge: 'new',
    badgeLabel: 'Nuevo',
    description: 'Motor Inverter Direct Drive, 14 programas de lavado, vapor antialérgico, pantalla táctil LED y control por app. Clase A+++.',
    specs: [
      {
        label: 'Capacidad',
        value: '10 kg'
      },
      {
        label: 'Centrifugado',
        value: '1400 RPM'
      },
      {
        label: 'Eficiencia',
        value: 'A+++'
      },
      {
        label: 'Programas',
        value: '14'
      },
      {
        label: 'Control',
        value: 'App + Panel'
      }
    ],
    image: 'assets/images/lavadora.svg',
    images: [
      'assets/images/lavadora.svg'
    ],
    featured: true,
    isNew: false,
    inStock: true
  },
  {
    id: 'p004',
    name: 'Frigorífico Side by Side 600L',
    category: 'Electrodomésticos',
    categorySlug: 'electrodomesticos',
    price: 899990,
    priceOld: 1099990,
    badge: 'import',
    badgeLabel: 'Importado',
    description: 'Refrigerador side by side con dispensador de agua y hielo, panel táctil, sistema No Frost total, zona freshzone y display interior.',
    specs: [
      {
        label: 'Capacidad',
        value: '600 L total'
      },
      {
        label: 'Refrigerador',
        value: '370 L'
      },
      {
        label: 'Congelador',
        value: '230 L'
      },
      {
        label: 'Eficiencia',
        value: 'A+'
      },
      {
        label: 'Control',
        value: 'Panel LCD'
      }
    ],
    image: 'assets/images/frigorifico.svg',
    images: [
      'assets/images/frigorifico.svg'
    ],
    featured: true,
    isNew: false,
    inStock: true
  },
  {
    id: 'p011',
    name: 'Drone 4K Pro con Gimbal 3 Ejes',
    category: 'Gadgets',
    categorySlug: 'gadgets',
    price: 399990,
    priceOld: 499990,
    badge: 'import',
    badgeLabel: 'Exclusivo',
    description: 'Drone plegable con cámara 4K/60fps, gimbal de 3 ejes, autonomía 40 min, alcance 10km, evitación de obstáculos omnidireccional y modos de vuelo inteligentes.',
    specs: [
      {
        label: 'Cámara',
        value: '4K 60fps / 48MP'
      },
      {
        label: 'Gimbal',
        value: '3 ejes'
      },
      {
        label: 'Autonomía',
        value: '40 minutos'
      },
      {
        label: 'Alcance',
        value: '10 km'
      },
      {
        label: 'Peso',
        value: '249 g'
      }
    ],
    image: 'assets/images/drone.svg',
    images: [
      'assets/images/drone.svg'
    ],
    featured: true,
    isNew: false,
    inStock: true
  },
  {
    id: 'p013',
    name: 'Secador Iónico Profesional 2400W',
    category: 'Belleza',
    categorySlug: 'belleza',
    price: 69990,
    priceOld: 89990,
    badge: 'hot',
    badgeLabel: 'Popular',
    description: 'Secador profesional con tecnología iónica y cerámica, motor DC de alta velocidad, difusor y concentrador incluidos, función frío y 3 velocidades.',
    specs: [
      {
        label: 'Potencia',
        value: '2400W'
      },
      {
        label: 'Tecnología',
        value: 'Iónico + Cerámico'
      },
      {
        label: 'Velocidades',
        value: '3'
      },
      {
        label: 'Temperaturas',
        value: '3 + frío'
      },
      {
        label: 'Cable',
        value: '3 metros'
      }
    ],
    image: 'assets/images/secador.svg',
    images: [
      'assets/images/secador.svg'
    ],
    featured: true,
    isNew: false,
    inStock: true
  },
  {
    id: 'p020',
    name: 'AFEITADORA KEMEI TX10',
    category: 'Belleza',
    categorySlug: 'belleza',
    price: 29900,
    priceOld: 35900,
    badge: 'new',
    badgeLabel: 'Nuevo',
    description: 'AFEITADORA KEMEI TX10\nBOLSILLO\nUSB TIPO C',
    specs: [],
    image: 'assets/images/placeholder.svg',
    images: [
      'assets/images/placeholder.svg'
    ],
    featured: false,
    isNew: true,
    inStock: true
  },
  {
    id: 'p008',
    name: 'Hub Smart Home WiFi 6 + Zigbee',
    category: 'Tecnología Hogar',
    categorySlug: 'tecnologia-hogar',
    price: 89990,
    priceOld: null,
    badge: 'new',
    badgeLabel: 'Nuevo',
    description: 'Central inteligente para hogar con WiFi 6 tri-banda, Zigbee 3.0, Z-Wave y Matter. Compatible con más de 5000 dispositivos IoT.',
    specs: [
      {
        label: 'WiFi',
        value: 'WiFi 6 (AX)'
      },
      {
        label: 'Protocolos',
        value: 'Zigbee / Z-Wave / Matter'
      },
      {
        label: 'Dispositivos',
        value: '+5000 compatibles'
      },
      {
        label: 'App',
        value: 'iOS + Android'
      },
      {
        label: 'Voz',
        value: 'Alexa / Google'
      }
    ],
    image: 'assets/images/hub.svg',
    images: [
      'assets/images/hub.svg'
    ],
    featured: false,
    isNew: true,
    inStock: true
  },
  {
    id: 'p012',
    name: 'Tableta Gráfica Digital 10\'',
    category: 'Gadgets',
    categorySlug: 'gadgets',
    price: 59990,
    priceOld: null,
    badge: 'new',
    badgeLabel: 'Nuevo',
    description: 'Tableta gráfica con pantalla LCD monocolor de 10\', lápiz con 8192 niveles de presión, sin batería, compatible con PC/Mac/Android.',
    specs: [
      {
        label: 'Área activa',
        value: '10 × 6.25\''
      },
      {
        label: 'Precisión',
        value: '8192 niveles'
      },
      {
        label: 'Resolución',
        value: '5080 LPI'
      },
      {
        label: 'Lápiz',
        value: 'Sin batería'
      },
      {
        label: 'Compatibilidad',
        value: 'Win / Mac / Android'
      }
    ],
    image: 'assets/images/tableta.svg',
    images: [
      'assets/images/tableta.svg'
    ],
    featured: false,
    isNew: true,
    inStock: true
  },
  {
    id: 'p019',
    name: 'Dron para Niños con Cámara HD 720p',
    category: 'Juguetes',
    categorySlug: 'juguetes',
    price: 39990,
    priceOld: 54990,
    badge: 'sale',
    badgeLabel: '-27%',
    description: 'Minidron estabilizado con altímetro, cámara HD 720p, 3 velocidades y modos acrobáticos. Diseñado para principiantes con hélices protegidas.',
    specs: [
      {
        label: 'Cámara',
        value: 'HD 720p'
      },
      {
        label: 'Autonomía',
        value: '15 min'
      },
      {
        label: 'Alcance',
        value: '50 m'
      },
      {
        label: 'Estabilización',
        value: 'Altímetro'
      },
      {
        label: 'Edad',
        value: '8+ años'
      }
    ],
    image: 'assets/images/mini-drone.svg',
    images: [
      'assets/images/mini-drone.svg'
    ],
    featured: false,
    isNew: true,
    inStock: true
  },
  {
    id: 'p001',
    name: 'Robot Aspirador Pro X12',
    category: 'Electrodomésticos',
    categorySlug: 'electrodomesticos',
    price: 189990,
    priceOld: 249990,
    badge: 'hot',
    badgeLabel: 'Más vendido',
    description: 'Robot aspirador inteligente con navegación láser LiDAR, mapeo de habitaciones, aspirado 4000Pa y autonomía de 180 minutos. Compatible con app y asistentes de voz.',
    specs: [
      {
        label: 'Succión',
        value: '4000 Pa'
      },
      {
        label: 'Autonomía',
        value: '180 min'
      },
      {
        label: 'Área máx.',
        value: '200 m²'
      },
      {
        label: 'Nivel ruido',
        value: '58 dB'
      },
      {
        label: 'Conectividad',
        value: 'Wi-Fi / App'
      }
    ],
    image: 'assets/images/robot-aspirador.svg',
    images: [
      'assets/images/robot-aspirador.svg'
    ],
    featured: false,
    isNew: false,
    inStock: true
  },
  {
    id: 'p002',
    name: 'Aire Acondicionado Inverter 12000 BTU',
    category: 'Electrodomésticos',
    categorySlug: 'electrodomesticos',
    price: 529990,
    priceOld: 649990,
    badge: 'sale',
    badgeLabel: '-18%',
    description: 'Sistema Inverter de alta eficiencia energética A++, control Wi-Fi, modo auto, calefacción y enfriamiento ultrasilencioso. Instalación split.',
    specs: [
      {
        label: 'Capacidad',
        value: '12.000 BTU'
      },
      {
        label: 'Eficiencia',
        value: 'A++'
      },
      {
        label: 'Área',
        value: 'Hasta 35 m²'
      },
      {
        label: 'Ruido',
        value: '19 dB (interior)'
      },
      {
        label: 'Control',
        value: 'Wi-Fi + IR'
      }
    ],
    image: 'assets/images/ac.svg',
    images: [
      'assets/images/ac.svg'
    ],
    featured: false,
    isNew: false,
    inStock: true
  },
  {
    id: 'p005',
    name: 'Smart TV QLED 65\' 4K 144Hz',
    category: 'Tecnología Hogar',
    categorySlug: 'tecnologia-hogar',
    price: 749990,
    priceOld: 999990,
    badge: 'hot',
    badgeLabel: 'Tendencia',
    description: 'Pantalla QLED Quantum Dot con resolución 4K UHD, frecuencia de 144Hz, HDR10+ Dolby Vision, sistema Android TV 12 y control por voz Google/Alexa.',
    specs: [
      {
        label: 'Pantalla',
        value: '65\' QLED'
      },
      {
        label: 'Resolución',
        value: '4K UHD'
      },
      {
        label: 'Frecuencia',
        value: '144 Hz'
      },
      {
        label: 'HDR',
        value: 'HDR10+ / Dolby Vision'
      },
      {
        label: 'OS',
        value: 'Android TV 12'
      }
    ],
    image: 'assets/images/smart-tv.svg',
    images: [
      'assets/images/smart-tv.svg'
    ],
    featured: false,
    isNew: false,
    inStock: true
  },
  {
    id: 'p006',
    name: 'Proyector 4K Láser 3000 Lúmenes',
    category: 'Tecnología Hogar',
    categorySlug: 'tecnologia-hogar',
    price: 1199990,
    priceOld: null,
    badge: 'new',
    badgeLabel: 'Nuevo',
    description: 'Proyector láser tri-color 4K con 3000 lúmenes, 30.000 horas de vida, autoenfoque eléctrico, corrección trapezoidal AI y Android TV integrado.',
    specs: [
      {
        label: 'Resolución',
        value: '4K UHD (3840×2160)'
      },
      {
        label: 'Brillo',
        value: '3000 ANSI Lúmenes'
      },
      {
        label: 'Contraste',
        value: '3.000.000:1'
      },
      {
        label: 'Vida útil',
        value: '30.000 h'
      },
      {
        label: 'Pantalla máx.',
        value: '300\''
      }
    ],
    image: 'assets/images/proyector.svg',
    images: [
      'assets/images/proyector.svg'
    ],
    featured: false,
    isNew: false,
    inStock: true
  },
  {
    id: 'p009',
    name: 'Smartwatch Ultra Pro AMOLED',
    category: 'Gadgets',
    categorySlug: 'gadgets',
    price: 129990,
    priceOld: 179990,
    badge: 'hot',
    badgeLabel: 'Top ventas',
    description: 'Reloj inteligente con pantalla AMOLED 1.96\', GPS integrado, 150+ modos deporte, SpO2, ECG, NFC y autonomía de 14 días.',
    specs: [
      {
        label: 'Pantalla',
        value: '1.96\' AMOLED'
      },
      {
        label: 'GPS',
        value: 'Integrado (multi-GNSS)'
      },
      {
        label: 'Autonomía',
        value: '14 días'
      },
      {
        label: 'Resistencia',
        value: '5ATM'
      },
      {
        label: 'Sensores',
        value: 'SpO2, ECG, HR'
      }
    ],
    image: 'assets/images/smartwatch.svg',
    images: [
      'assets/images/smartwatch.svg'
    ],
    featured: false,
    isNew: false,
    inStock: true
  },
  {
    id: 'p010',
    name: 'Auriculares TWS ANC Pro 40',
    category: 'Gadgets',
    categorySlug: 'gadgets',
    price: 79990,
    priceOld: 109990,
    badge: 'sale',
    badgeLabel: '-27%',
    description: 'Earbuds premium con cancelación activa de ruido (ANC) -40dB, drivers de 12mm, Bluetooth 5.3, carga inalámbrica y hasta 36 horas de autonomía total.',
    specs: [
      {
        label: 'Driver',
        value: '12mm + BA'
      },
      {
        label: 'ANC',
        value: '-40 dB'
      },
      {
        label: 'Autonomía',
        value: '8h + 28h (funda)'
      },
      {
        label: 'Bluetooth',
        value: '5.3 (LDAC)'
      },
      {
        label: 'Carga',
        value: 'USB-C + Qi'
      }
    ],
    image: 'assets/images/earbuds.svg',
    images: [
      'assets/images/earbuds.svg'
    ],
    featured: false,
    isNew: false,
    inStock: true
  },
  {
    id: 'p014',
    name: 'Masajeador Facial LED + EMS',
    category: 'Belleza',
    categorySlug: 'belleza',
    price: 49990,
    priceOld: 69990,
    badge: 'new',
    badgeLabel: 'Nuevo',
    description: 'Dispositivo de microcorriente y LED para lifting facial, con 7 luces LED terapéuticas, EMS, calor de 42°C y modos personalizables.',
    specs: [
      {
        label: 'Tecnologías',
        value: 'LED + EMS + Microcorriente'
      },
      {
        label: 'Luces LED',
        value: '7 colores'
      },
      {
        label: 'Temperatura',
        value: '42°C'
      },
      {
        label: 'Modos',
        value: '5'
      },
      {
        label: 'Carga',
        value: 'USB-C'
      }
    ],
    image: 'assets/images/masajeador.svg',
    images: [
      'assets/images/masajeador.svg'
    ],
    featured: false,
    isNew: false,
    inStock: true
  },
  {
    id: 'p017',
    name: 'Auto RC Control Remoto 4x4 Offroad',
    category: 'Juguetes',
    categorySlug: 'juguetes',
    price: 49990,
    priceOld: 69990,
    badge: 'hot',
    badgeLabel: 'Popular',
    description: 'Vehículo todoterreno de control remoto con suspensión independiente, tracción 4x4, velocidad máxima 35 km/h, batería recargable y alcance de 80 metros.',
    specs: [
      {
        label: 'Velocidad',
        value: '35 km/h'
      },
      {
        label: 'Alcance',
        value: '80 m'
      },
      {
        label: 'Tracción',
        value: '4x4'
      },
      {
        label: 'Batería',
        value: 'Li-Ion 1200 mAh'
      },
      {
        label: 'Autonomía',
        value: '25 min'
      }
    ],
    image: 'assets/images/auto-rc.svg',
    images: [
      'assets/images/auto-rc.svg'
    ],
    featured: false,
    isNew: false,
    inStock: true
  },
  {
    id: 'p007',
    name: 'Bocina Inteligente Subwoofer 2.1',
    category: 'Tecnología Hogar',
    categorySlug: 'tecnologia-hogar',
    price: 159990,
    priceOld: 199990,
    badge: null,
    badgeLabel: null,
    description: 'Sistema de audio 2.1 con subwoofer inalámbrico, 120W totales, Dolby Atmos, Wi-Fi, Bluetooth 5.2 y control por app o voz.',
    specs: [
      {
        label: 'Potencia',
        value: '120W (80+40)'
      },
      {
        label: 'Audio',
        value: 'Dolby Atmos'
      },
      {
        label: 'Conectividad',
        value: 'Wi-Fi / BT 5.2'
      },
      {
        label: 'Respuesta',
        value: '40Hz – 20kHz'
      },
      {
        label: 'Control',
        value: 'App + Voz'
      }
    ],
    image: 'assets/images/bocina.svg',
    images: [
      'assets/images/bocina.svg'
    ],
    featured: false,
    isNew: false,
    inStock: true
  },
  {
    id: 'p015',
    name: 'Plancha Alisadora Titanio 450°F',
    category: 'Belleza',
    categorySlug: 'belleza',
    price: 44990,
    priceOld: 59990,
    badge: null,
    badgeLabel: null,
    description: 'Plancha profesional con placas de titanio flotantes, calentamiento en 15 segundos, pantalla LCD, ajuste 150–230°C y apagado automático.',
    specs: [
      {
        label: 'Placas',
        value: 'Titanio flotante'
      },
      {
        label: 'Temperatura',
        value: '150–230°C'
      },
      {
        label: 'Calentamiento',
        value: '15 segundos'
      },
      {
        label: 'Display',
        value: 'LCD digital'
      },
      {
        label: 'Seguridad',
        value: 'Auto apagado 30 min'
      }
    ],
    image: 'assets/images/plancha.svg',
    images: [
      'assets/images/plancha.svg'
    ],
    featured: false,
    isNew: false,
    inStock: true
  }
];

/* ── Catalog State ────────────────────────────────────────── */
const catalogState = {
  category: 'all',
  search: '',
  sort: 'featured',
  page: 1,
  perPage: 8,
};

/* ── Render Helpers ───────────────────────────────────────── */
function badgeHTML(p) {
  if (!p.badge) return '';
  const cls = { new: 'badge-new', hot: 'badge-hot', sale: 'badge-sale', import: 'badge-import' }[p.badge] || '';
  return `<span class="badge ${cls}">${p.badgeLabel}</span>`;
}
function priceHTML(p) {
  return `<div>${p.priceOld ? `<span class="product-card-price-old">${formatPrice(p.priceOld)}</span>` : ''}<span class="product-card-price">${formatPrice(p.price)}</span></div>`;
}
function productCardHTML(p) {
  return `<article class="product-card reveal" data-product-id="${p.id}"><div class="product-card-image"><div class="product-card-badges">${badgeHTML(p)}</div><div class="product-card-actions"><button class="product-card-action-btn" onclick="openQuickView('${p.id}')" title="Vista rápida">👁</button><a class="product-card-action-btn" href="${whatsappUrl('Hola! Me interesa: '+p.name)}" target="_blank" title="Consultar">💬</a></div><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='.3'"></div><div class="product-card-body"><div class="product-card-category">${p.category}</div><h3 class="product-card-name">${p.name}</h3><p class="product-card-specs">${p.specs?.[0] ? p.specs[0].label+': '+p.specs[0].value : ''}</p><div class="product-card-footer">${priceHTML(p)}<a href="producto.html?id=${p.id}" class="product-card-btn" title="Ver producto">→</a></div></div></article>`;
}
function getFilteredProducts() {
  let list = [...PRODUCTS_DATA];
  if (catalogState.category !== 'all') list = list.filter(p => p.categorySlug === catalogState.category);
  if (catalogState.search.trim()) { const q = catalogState.search.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)); }
  switch (catalogState.sort) {
    case 'price-asc':  list.sort((a,b) => a.price - b.price); break;
    case 'price-desc': list.sort((a,b) => b.price - a.price); break;
    case 'new':        list.sort((a,b) => (b.isNew?1:0)-(a.isNew?1:0)); break;
    default:           list.sort((a,b) => (b.featured?1:0)-(a.featured?1:0)); break;
  }
  return list;
}
function renderCatalog() {
  const grid = $('#catalog-grid'), countEl = $('#catalog-count'), emptyEl = $('#catalog-empty');
  if (!grid) return;
  const filtered = getFilteredProducts(), start = (catalogState.page-1)*catalogState.perPage, page = filtered.slice(start, start+catalogState.perPage);
  if (countEl) countEl.textContent = filtered.length+' producto'+(filtered.length!==1?'s':'');
  if (!filtered.length) { grid.innerHTML=''; emptyEl?.removeAttribute('hidden'); } else { emptyEl?.setAttribute('hidden',''); grid.innerHTML=page.map(productCardHTML).join(''); renderPagination(filtered.length); initScrollAnimations(); }
}
function renderPagination(total) {
  const pag = $('#catalog-pagination'); if (!pag) return;
  const pages = Math.ceil(total/catalogState.perPage); if (pages<=1){pag.innerHTML='';return;}
  let html=''; if(catalogState.page>1) html+=`<button class="page-btn" data-page="${catalogState.page-1}">‹</button>`;
  for(let i=1;i<=pages;i++) html+=`<button class="page-btn${i===catalogState.page?' active':''}" data-page="${i}">${i}</button>`;
  if(catalogState.page<pages) html+=`<button class="page-btn" data-page="${catalogState.page+1}">›</button>`;
  pag.innerHTML=html; pag.querySelectorAll('.page-btn').forEach(btn=>{ btn.addEventListener('click',()=>{ catalogState.page=parseInt(btn.dataset.page); renderCatalog(); window.scrollTo({top:0,behavior:'smooth'}); }); });
}
function initCatalogPage() {
  if (!$('#catalog-grid')) return;
  $$('.filter-tab').forEach(tab=>{ tab.addEventListener('click',()=>{ $$('.filter-tab').forEach(t=>t.classList.remove('active')); tab.classList.add('active'); catalogState.category=tab.dataset.category; catalogState.page=1; renderCatalog(); }); });
  const sortSel=$('#catalog-sort'); sortSel?.addEventListener('change',()=>{ catalogState.sort=sortSel.value; catalogState.page=1; renderCatalog(); });
  const searchInput=$('#catalog-search'); searchInput?.addEventListener('input',debounce(()=>{ catalogState.search=searchInput.value; catalogState.page=1; renderCatalog(); },300));
  const params=new URLSearchParams(location.search); if(params.get('category')){ catalogState.category=params.get('category'); $$('.filter-tab').forEach(t=>{ t.classList.toggle('active',t.dataset.category===catalogState.category); }); }
  renderCatalog();
}
function initProductPage() {
  const productContainer=$('#product-detail'); if(!productContainer) return;
  const params=new URLSearchParams(location.search), id=params.get('id'), product=PRODUCTS_DATA.find(p=>p.id===id)||PRODUCTS_DATA[0];
  document.title=product.name+' — Mavisa'; $('#pd-breadcrumb-name').textContent=product.name; $('#pd-category').textContent=product.category; $('#pd-title').textContent=product.name; $('#pd-badge-wrap').innerHTML=badgeHTML(product); $('#pd-price').textContent=formatPrice(product.price);
  if(product.priceOld){$('#pd-price-old').textContent=formatPrice(product.priceOld);const disc=Math.round((1-product.price/product.priceOld)*100);$('#pd-discount').textContent='-'+disc+'%';$('#pd-discount').removeAttribute('hidden');}
  $('#pd-description').textContent=product.description;
  const specsEl=$('#pd-specs'); if(specsEl&&product.specs){specsEl.innerHTML=product.specs.map(s=>`<div class="modal-spec-row"><span class="modal-spec-label">${s.label}</span><span class="modal-spec-value">${s.value}</span></div>`).join('');}
  const mainImg=$('#pd-main-img'); if(mainImg) mainImg.src=product.image;
  $$('.pd-whatsapp').forEach(b=>{ b.href=whatsappUrl('Hola! Me interesa el producto: '+product.name+'. ¿Podría darme más información y el precio actual? 🛒'); });
  const relatedGrid=$('#related-grid'); if(relatedGrid){const related=PRODUCTS_DATA.filter(p=>p.categorySlug===product.categorySlug&&p.id!==product.id).slice(0,4);relatedGrid.innerHTML=related.map(productCardHTML).join('');}
  initScrollAnimations();
}
function fixCardsInTrack(track) {
  if (!track) return;
  const isMobile = window.innerWidth <= 768;
  const cardW = isMobile ? 160 : 260;
  const gap = isMobile ? 12 : 20;
  // Force horizontal flex on track
  track.style.cssText = `display:flex;flex-direction:row;flex-wrap:nowrap;gap:${gap}px;width:max-content;padding:8px 4px;`;
  track.querySelectorAll('.product-card').forEach(card => {
    card.style.cssText += `;width:${cardW}px;min-width:${cardW}px;max-width:${cardW}px;flex-shrink:0;`;
  });
  // Force scroll on wrap
  const wrap = track.closest('.h-scroll-wrap');
  if (!wrap) return;
  wrap.style.cssText = 'overflow-x:auto;overflow-y:hidden;width:100%;cursor:grab;scrollbar-width:none;';
  let isDown=false, startX, scrollLeft;
  wrap.addEventListener('mousedown', e=>{isDown=true;startX=e.pageX-wrap.offsetLeft;scrollLeft=wrap.scrollLeft;});
  wrap.addEventListener('mouseleave',()=>isDown=false);
  wrap.addEventListener('mouseup',()=>isDown=false);
  wrap.addEventListener('mousemove',e=>{if(!isDown)return;e.preventDefault();const x=e.pageX-wrap.offsetLeft;wrap.scrollLeft=scrollLeft-(x-startX);});
}
function initHomeFeatured() {
  const featuredGrid=$('#featured-grid'); if(!featuredGrid) return;
  const featured=PRODUCTS_DATA.filter(p=>p.featured).slice(0,8);
  featuredGrid.innerHTML=featured.map(productCardHTML).join('');
  fixCardsInTrack(featuredGrid);
  const newGrid=$('#new-grid');
  if(newGrid){const newProducts=PRODUCTS_DATA.filter(p=>p.isNew).slice(0,8);newGrid.innerHTML=newProducts.map(productCardHTML).join('');fixCardsInTrack(newGrid);}
  initScrollAnimations();
}
document.addEventListener('DOMContentLoaded',()=>{ initCatalogPage(); initProductPage(); initHomeFeatured(); });