/* ============================================================
   MAVISA — Main JavaScript  v2.0
   Navigation · Particles · Animations · WhatsApp · Search
   ============================================================ */

'use strict';

/* ── Config ───────────────────────────────────────────────── */
const CONFIG = {
  whatsapp: '+56956654167',
  whatsappMsg: 'Hola! Me interesa conocer más sobre sus productos. 🛒',
  storeName: 'Mavisa',
  storeLocation: 'ZOFRI, Iquique, Chile',
};

/* ── Helpers ──────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn, opts) => el?.addEventListener(ev, fn, opts);
const off = (el, ev, fn) => el?.removeEventListener(ev, fn);

function formatPrice(n) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(n);
}
function whatsappUrl(msg = CONFIG.whatsappMsg) {
  return `https://wa.me/${CONFIG.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`;
}
function debounce(fn, ms = 100) {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

/* ── Navbar ───────────────────────────────────────────────── */
function initNav() {
  const nav = $('.nav');
  if (!nav) return;

  const ticker = document.getElementById('announce-bar');
  const TICKER_H = 40;
  const updateNav = () => {
    const scrolled = window.scrollY > TICKER_H;
    nav.classList.toggle('scrolled', window.scrollY > 20);
    nav.classList.toggle('ticker-gone', scrolled);
    if (ticker) ticker.classList.toggle('hidden', scrolled);
  };
  on(window, 'scroll', updateNav, { passive: true });
  updateNav();

  // Active link
  const page = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Mobile menu — funciones globales (llamadas desde onclick en HTML)
  window.openMobileMenu = function() {
    const menu = document.getElementById('nav-mobile');
    const ov   = document.getElementById('nav-overlay');
    if (menu) menu.classList.add('open');
    if (ov)   ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeMobileMenu = function() {
    const menu = document.getElementById('nav-mobile');
    const ov   = document.getElementById('nav-overlay');
    if (menu) menu.classList.remove('open');
    if (ov)   ov.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Cerrar al hacer click en links del menú mobile
  document.querySelectorAll('.nav-mobile-link, .nav-mobile-cat').forEach(function(l) {
    l.addEventListener('click', window.closeMobileMenu);
  });
}

/* ── Scroll Progress Bar ──────────────────────────────────── */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
  };
  on(window, 'scroll', update, { passive: true });
}

/* ── Ripple Effect on Buttons ─────────────────────────────── */
function initRipple() {
  const selectors = '.btn, .nav-cotizar, .btn-whatsapp, button[type="submit"]';
  document.addEventListener('click', e => {
    const btn = e.target.closest(selectors);
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-wave';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top  = (e.clientY - rect.top) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
}

/* ── 3D Card Tilt ─────────────────────────────────────────── */
function initCardTilt() {
  const cards = $$('.product-card, .category-card, .contact-method-card');
  const MAX_TILT = 8;

  cards.forEach(card => {
    card.classList.add('tilt-card');

    // Add shine layer
    const shine = document.createElement('div');
    shine.className = 'tilt-shine';
    card.style.position = card.style.position || 'relative';
    card.appendChild(shine);

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      card.style.transform = `
        perspective(800px)
        rotateY(${dx * MAX_TILT}deg)
        rotateX(${-dy * MAX_TILT}deg)
        translateZ(8px)
      `;

      // Update shine position
      const mx = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const my = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      shine.style.setProperty('--mx', mx + '%');
      shine.style.setProperty('--my', my + '%');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
  });
}

/* ── Magnetic Buttons ─────────────────────────────────────── */
function initMagnetic() {
  const btns = $$('.btn-primary, .btn-whatsapp, .nav-cotizar');
  const STRENGTH = 0.28;

  btns.forEach(btn => {
    btn.classList.add('magnetic');

    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * STRENGTH;
      const dy = (e.clientY - cy) * STRENGTH;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ── Particles — Colores navy/rojo ───────────────────────── */
function initParticles() {
  const canvas = $('#particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  // Brand palette particles
  const COLORS = [
    '28,52,97',   // navy
    '232,48,63',  // rojo
    '255,255,255',// blanco
  ];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.45 + 0.08;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((W * H) / 14000), 80);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - dist / 90)})`;
          ctx.lineWidth = 0.4;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }

  init();
  animate();

  const resizeObs = new ResizeObserver(debounce(init, 200));
  resizeObs.observe(canvas.parentElement);
}

/* ── Scroll Animations ────────────────────────────────────── */
function initScrollAnimations() {
  const targets = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip, .stagger-children');
  if (!targets.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -36px 0px' });

  targets.forEach(t => obs.observe(t));
}

/* ── Counter Animation ────────────────────────────────────── */
function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  function runCount(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const dur = parseInt(el.dataset.duration) || 1800;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / dur, 1);
      const value = Math.floor(easeOut(progress) * target);
      el.textContent = prefix + value.toLocaleString('es-CL') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toLocaleString('es-CL') + suffix;
    }
    requestAnimationFrame(tick);
  }

  // Re-animar cada vez que el elemento entra en pantalla (no solo la primera)
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) runCount(e.target);
    });
  }, { threshold: 0.6 });

  counters.forEach(c => obs.observe(c));
}

/* ── Typed Text ───────────────────────────────────────────── */
function initTyped() {
  const el = $('#typed-text');
  if (!el) return;
  const words = el.dataset.words?.split('|') || [];
  if (!words.length) return;

  let wIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const word = words[wIdx];
    el.textContent = deleting ? word.slice(0, cIdx--) : word.slice(0, ++cIdx);
    let delay = deleting ? 55 : 95;
    if (!deleting && cIdx === word.length) { delay = 2400; deleting = true; }
    else if (deleting && cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; delay = 380; }
    setTimeout(type, delay);
  }
  type();
}

/* ── Parallax ─────────────────────────────────────────────── */
function initParallax() {
  const els = $$('[data-parallax]');
  if (!els.length) return;

  const update = () => {
    const sy = window.scrollY;
    els.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      el.style.transform = `translateY(${sy * speed}px)`;
    });
  };
  on(window, 'scroll', update, { passive: true });
}

/* ── WhatsApp Float ───────────────────────────────────────── */
function initWhatsApp() {
  const btn = $('.whatsapp-float');
  if (!btn) return;
  btn.href = whatsappUrl();
}

/* ── Quick View Modal ─────────────────────────────────────── */
window.openQuickView = function(productId) {
  const product = PRODUCTS_DATA?.find(p => p.id === productId);
  if (!product) return;
  const modal = $('#quick-view-modal');
  if (!modal) return;

  $('#qv-image').src = product.image || 'assets/images/placeholder.svg';
  $('#qv-category').textContent = product.category;
  $('#qv-title').textContent = product.name;
  $('#qv-price').textContent = formatPrice(product.price);
  $('#qv-desc').textContent = product.description;

  const specsEl = $('#qv-specs');
  if (specsEl && product.specs) {
    specsEl.innerHTML = product.specs.map(s =>
      `<div class="modal-spec-row">
        <span class="modal-spec-label">${s.label}</span>
        <span class="modal-spec-value">${s.value}</span>
      </div>`
    ).join('');
  }

  $$('.qv-whatsapp', modal).forEach(b => {
    b.href = whatsappUrl(`Hola! Me interesa el producto: ${product.name}. ¿Podría darme más información? 🛒`);
  });

  const detailBtn = $('#qv-detail-btn');
  if (detailBtn) detailBtn.href = `producto.html?id=${product.id}`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeQuickView = function() {
  const modal = $('#quick-view-modal');
  modal?.classList.remove('open');
  document.body.style.overflow = '';
};

function initModal() {
  const modal = $('#quick-view-modal');
  if (!modal) return;
  on(modal, 'click', e => { if (e.target === modal) window.closeQuickView(); });
  on(document, 'keydown', e => { if (e.key === 'Escape') window.closeQuickView(); });
}

/* ── Toast ────────────────────────────────────────────────── */
window.showToast = function(msg, icon = '✨') {
  const container = $('.toast-container') || (() => {
    const c = document.createElement('div');
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
};

/* ── Smooth Page Transitions — solo fade de salida ────────── */
function initPageTransitions() {
  on(document, 'click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('wa.me')) return;
    if (link.target === '_blank') return;

    e.preventDefault();
    document.body.style.transition = 'opacity 0.15s ease';
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.href = href; }, 150);
  });
}

/* ── Image Error Fallback ─────────────────────────────────── */
function initImageFallbacks() {
  $$('img').forEach(img => {
    on(img, 'error', () => { img.style.opacity = '0.3'; });
  });
}

/* ── Live Search ──────────────────────────────────────────── */
function initLiveSearch() {
  const input = document.getElementById('nav-search-input');
  const dropdown = document.getElementById('search-dropdown');
  if (!input || !dropdown) return;

  const CATEGORY_EMOJI = {
    'Belleza': '💄',
    'Mascotas': '🐾',
    'Hobbies': '🎨',
    'Electrodomésticos': '🫖',
    'Salud': '💊',
    'Barbería': '✂️',
  };

  function getProducts() {
    return (typeof PRODUCTS_DATA !== 'undefined') ? PRODUCTS_DATA : [];
  }

  function showResults(query) {
    const q = query.trim().toLowerCase();
    if (q.length < 2) { closeDropdown(); return; }

    const matches = getProducts().filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    ).slice(0, 7);

    if (!matches.length) {
      dropdown.innerHTML = `
        <a href="catalogo.html?search=${encodeURIComponent(query)}" class="search-result-item" style="justify-content:center;gap:8px;padding:16px;">
          <span style="font-size:1.1rem;">🔍</span>
          <span style="font-weight:600;color:var(--navy);">Ver productos similares a "<em>${query}</em>"</span>
          <span class="search-result-ver" style="margin-left:auto;">Buscar →</span>
        </a>`;
    } else {
      dropdown.innerHTML = matches.map(p => `
        <a href="producto.html?id=${p.id}" class="search-result-item">
          <div class="search-result-emoji">${CATEGORY_EMOJI[p.category] || '📦'}</div>
          <div class="search-result-info">
            <div class="search-result-name">${p.name}</div>
            <div class="search-result-cat">${p.category}</div>
          </div>
          <div class="search-result-price">${formatPrice(p.price)}</div>
          <div class="search-result-ver">Ver →</div>
        </a>
      `).join('');
    }
    dropdown.classList.add('open');
  }

  function closeDropdown() { dropdown.classList.remove('open'); }

  on(input, 'input', debounce(e => showResults(e.target.value), 180));
  on(input, 'focus', e => { if (e.target.value.trim().length >= 2) showResults(e.target.value); });
  on(input, 'keydown', e => {
    if (e.key === 'Escape') { closeDropdown(); input.blur(); }
    if (e.key === 'Enter') {
      e.preventDefault();
      const q = input.value.trim();
      if (q.length >= 2) {
        closeDropdown();
        window.location.href = `catalogo.html?search=${encodeURIComponent(q)}`;
      }
    }
  });
  on(document, 'click', e => {
    if (!e.target.closest('.nav-search')) closeDropdown();
  });
}

/* ── Nav Search Submit ────────────────────────────────────── */
window.navSearch = function(e) {
  e.preventDefault();
  const q = document.getElementById('nav-search-input')?.value?.trim();
  if (q) window.location.href = `catalogo.html?search=${encodeURIComponent(q)}`;
};

/* ── Mobile Search Overlay ────────────────────────────────── */
(function() {
  const CATEGORY_EMOJI = {
    'Electrodomésticos': '🫖', 'Tecnología Hogar': '🖥️',
    'Gadgets': '🎧', 'Belleza': '🪞', 'Juguetes': '🤖',
  };

  function getProducts() {
    return (typeof PRODUCTS_DATA !== 'undefined') ? PRODUCTS_DATA : [];
  }

  function renderResults(query) {
    const container = document.getElementById('mso-results');
    if (!container) return;
    const q = (query || '').trim().toLowerCase();

    if (q.length < 2) {
      container.innerHTML = '<div class="mso-empty"><div class="mso-empty-icon">🔍</div>Escribe para buscar productos</div>';
      return;
    }

    const matches = getProducts().filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    ).slice(0, 10);

    if (!matches.length) {
      container.innerHTML = `<div class="mso-empty"><div class="mso-empty-icon">😕</div>No encontramos productos para "<strong>${query}</strong>"<br><br><a href="catalogo.html?search=${encodeURIComponent(query)}" style="color:var(--navy);font-weight:600;">Ver catálogo completo →</a></div>`;
      return;
    }

    const items = matches.map(p => {
      const imgHtml = p.image
        ? `<div class="mso-item-img"><img src="${p.image}" alt="${p.name}" onerror="this.parentElement.innerHTML='${CATEGORY_EMOJI[p.category]||'📦'}'"></div>`
        : `<div class="mso-item-img">${CATEGORY_EMOJI[p.category] || '📦'}</div>`;
      const price = p.price ? new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',minimumFractionDigits:0}).format(p.price) : '';
      return `<a href="producto.html?id=${p.id}" class="mso-item" onclick="closeMobileSearch()">
        ${imgHtml}
        <div class="mso-item-info">
          <div class="mso-item-name">${p.name}</div>
          <div class="mso-item-cat">${p.category || ''}</div>
        </div>
        <div class="mso-item-price">${price}</div>
      </a>`;
    }).join('');

    const viewAll = `<a href="catalogo.html?search=${encodeURIComponent(query)}" class="mso-view-all" onclick="closeMobileSearch()">Ver todos los resultados para "${query}" →</a>`;
    container.innerHTML = items + viewAll;
  }

  // Debounce util
  function debounce(fn, ms) {
    let t; return function(...a) { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  }

  window.openMobileSearch = function() {
    const overlay = document.getElementById('mobile-search-overlay');
    const input   = document.getElementById('mobile-search-input');
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderResults('');
    setTimeout(() => input && input.focus(), 320);

    // Wire input on first open
    if (!overlay._wired) {
      overlay._wired = true;
      const debouncedRender = debounce(e => renderResults(e.target.value), 200);
      input.addEventListener('input', debouncedRender);
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          const q = input.value.trim();
          if (q.length >= 2) {
            closeMobileSearch();
            window.location.href = `catalogo.html?search=${encodeURIComponent(q)}`;
          }
        }
        if (e.key === 'Escape') closeMobileSearch();
      });
    }
  };

  window.closeMobileSearch = function() {
    const overlay = document.getElementById('mobile-search-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    const input = document.getElementById('mobile-search-input');
    if (input) input.value = '';
  };
})();

/* ── Page Loader ──────────────────────────────────────────── */
(function initLoader() {
  // Solo mostrar en index y solo la primera vez por sesión
  const page = location.pathname.split('/').pop() || 'index.html';
  if (page !== 'index.html' && page !== '') return;
  if (sessionStorage.getItem('mavisa_loaded')) return;
  sessionStorage.setItem('mavisa_loaded', '1');

  const DURATION = 1500; // ms

  const style = document.createElement('style');
  style.textContent = `
    #mavisa-loader {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #1C3461;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
      transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1),
                  transform 0.5s cubic-bezier(0.4,0,0.2,1);
    }
    #mavisa-loader.hide {
      opacity: 0;
      transform: scale(1.04);
      pointer-events: none;
    }
    #mavisa-loader .ldr-logo {
      width: 110px; height: 110px;
      display: flex; align-items: center; justify-content: center;
      animation: ldr-pop 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s both;
    }
    #mavisa-loader .ldr-logo img {
      width: 100%; height: 100%;
      object-fit: contain;
      filter: brightness(0) invert(1);
      drop-shadow: 0 8px 24px rgba(255,255,255,0.15);
    }
    #mavisa-loader .ldr-brand {
      font-family: 'Raleway', sans-serif;
      font-size: 2.2rem;
      font-weight: 900;
      color: #fff;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-top: 18px;
      animation: ldr-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.22s both;
    }
    #mavisa-loader .ldr-sub {
      font-size: 0.68rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.38);
      margin-top: 7px;
      animation: ldr-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both;
    }
    #mavisa-loader .ldr-bar-wrap {
      width: 100px;
      height: 2px;
      background: rgba(255,255,255,0.1);
      border-radius: 99px;
      margin-top: 32px;
      overflow: hidden;
      animation: ldr-fade-up 0.5s ease 0.4s both;
    }
    #mavisa-loader .ldr-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #E8303F, #ff7b87);
      border-radius: 99px;
    }
    @keyframes ldr-pop {
      from { opacity:0; transform: scale(0.65) rotate(-6deg); }
      to   { opacity:1; transform: scale(1) rotate(0deg); }
    }
    @keyframes ldr-fade-up {
      from { opacity:0; transform: translateY(14px); }
      to   { opacity:1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  const loader = document.createElement('div');
  loader.id = 'mavisa-loader';
  loader.innerHTML = `
    <div class="ldr-logo"><img src="assets/images/logo-sv.png" alt="Mavisa"></div>
    <div class="ldr-brand">MAVISA</div>
    <div class="ldr-sub">Mall ZOFRI &nbsp;·&nbsp; Iquique</div>
    <div class="ldr-bar-wrap"><div class="ldr-bar" id="ldr-bar"></div></div>
  `;
  document.body.appendChild(loader);
  document.body.style.overflow = 'hidden';

  // Animate progress bar over DURATION
  const bar = loader.querySelector('#ldr-bar');
  let start = null;
  function animateBar(ts) {
    if (!start) start = ts;
    const pct = Math.min((ts - start) / DURATION * 100, 100);
    bar.style.width = pct + '%';
    if (pct < 100) requestAnimationFrame(animateBar);
  }
  requestAnimationFrame(animateBar);

  // Hide after DURATION
  setTimeout(() => {
    loader.classList.add('hide');
    document.body.style.overflow = '';
    setTimeout(() => loader.remove(), 600);
  }, DURATION);
})();

/* ── Init All ─────────────────────────────────────────────── */
/* ── Stats Strip — animación entrada con IntersectionObserver ── */
(function() {
  function initStatsStrip() {
    const strip = document.querySelector('.stats-strip');
    if (!strip) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          strip.classList.add('in-view');
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(strip);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatsStrip);
  } else {
    initStatsStrip();
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollProgress();
  initRipple();
  initParticles();
  initScrollAnimations();
  initCounters();
  initCardTilt();
  initMagnetic();
  initTyped();
  initParallax();
  initWhatsApp();
  initModal();
  initPageTransitions();
  initImageFallbacks();
  initLiveSearch();
});
