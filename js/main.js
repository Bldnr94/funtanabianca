/* ════════════════════════════════════════════════
   AUBERGE FUNTANA BIANCA — js/main.js
   ════════════════════════════════════════════════ */

/* ── GALERIE : ajoutez vos chemins d'images ici ──────────────────
   Format : { src: 'chemin/image.webp', alt: 'Description' }
   Exemple :
     { src: 'assets/img/galerie/gal-01.webp', alt: 'Vue du domaine' },
   ──────────────────────────────────────────────────────────────── */
const GALLERY_IMAGES = [
  { src: 'assets/img/galerie/gal-01.webp', alt: 'Plateau de charcuterie corse et vin rouge devant la cheminée' },
  { src: 'assets/img/galerie/gal-02.webp', alt: 'Cheval à l\'entrée de la bergerie en pierre' },
  { src: 'assets/img/galerie/gal-03.webp', alt: 'Plateau de charcuterie et vin, salle intérieure' },
  { src: 'assets/img/galerie/gal-04.webp', alt: 'Vin rouge et figatellu, table du restaurant' },
  { src: 'assets/img/galerie/gal-05.webp', alt: 'Plateau de charcuterie corse gastronomique' },
  { src: 'assets/img/galerie/gal-06.webp', alt: 'Charcuterie corse et verre de vin en terrasse' },
  { src: 'assets/img/galerie/gal-07.webp', alt: 'Chiens et chevaux dans les pâturages du domaine' },
  { src: 'assets/img/galerie/gal-08.webp', alt: 'Assiette corse : lonzu, fromage et frites maison' },
  { src: 'assets/img/galerie/gal-09.webp', alt: 'Mur en granite corse, architecture traditionnelle' },
  { src: 'assets/img/galerie/gal-10.webp', alt: 'Cochon à la broche pour une soirée événementielle' },
  { src: 'assets/img/galerie/gal-11.webp', alt: 'Ambiance de soirée au bar du domaine' },
];

/* ── NAV ─────────────────────────────────────────── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 40);
});

const burger = document.getElementById('nav-burger');
const navMenu = document.getElementById('nav-menu');
if (burger && navMenu) {
  burger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));
}

/* ── REVEAL (scroll animation) ───────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── TOAST ───────────────────────────────────────── */
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = '✓ ' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── GALERIE ONGLET ──────────────────────────────── */
let lbIndex = 0;

function openGalerie() {
  renderGalerie();
  document.getElementById('galerie-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('gal-close-btn') && document.getElementById('gal-close-btn').focus();
}

function closeGalerie() {
  document.getElementById('galerie-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function renderGalerie() {
  const grid = document.getElementById('gal-grid');
  if (!GALLERY_IMAGES.length) {
    grid.innerHTML = '<div class="gal-empty">Galerie en cours de construction — revenez bientôt !</div>';
    return;
  }
  grid.innerHTML = '';
  GALLERY_IMAGES.forEach((photo, i) => {
    const div = document.createElement('div');
    div.className = 'gal-item';
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt || ('Photo ' + (i + 1) + ' — Auberge Funtana Bianca');
    img.loading = 'lazy';
    img.width = 400;
    img.height = 300;
    img.addEventListener('click', () => openLightbox(i));
    img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(i); });
    img.tabIndex = 0;
    div.appendChild(img);
    grid.appendChild(div);
  });
}

/* ── LIGHTBOX ────────────────────────────────────── */
function openLightbox(idx) {
  if (!GALLERY_IMAGES.length) return;
  lbIndex = idx;
  const photo = GALLERY_IMAGES[idx];
  document.getElementById('lb-img').src = photo.src;
  document.getElementById('lb-img').alt = photo.alt || '';
  document.getElementById('lb-caption').textContent = (idx + 1) + ' / ' + GALLERY_IMAGES.length;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox(e) {
  if (e && e.target !== document.getElementById('lightbox') && !e.target.classList.contains('lb-close')) return;
  if (!e) {
    document.getElementById('lightbox').classList.remove('open');
    return;
  }
  document.getElementById('lightbox').classList.remove('open');
}

function lbNav(dir) {
  if (!GALLERY_IMAGES.length) return;
  lbIndex = (lbIndex + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  const photo = GALLERY_IMAGES[lbIndex];
  document.getElementById('lb-img').src = photo.src;
  document.getElementById('lb-img').alt = photo.alt || '';
  document.getElementById('lb-caption').textContent = (lbIndex + 1) + ' / ' + GALLERY_IMAGES.length;
}

/* ── CLAVIER ─────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeGalerie();
    document.getElementById('lightbox').classList.remove('open');
  }
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

/* ── FORMULAIRE WEB3FORMS ────────────────────────── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    const successEl = document.getElementById('form-success');
    const errorEl   = document.getElementById('form-error');
    successEl.hidden = true;
    errorEl.hidden   = true;
    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';
    try {
      const data = new FormData(this);
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if (json.success) {
        successEl.hidden = false;
        this.reset();
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        errorEl.hidden = false;
      }
    } catch (_) {
      errorEl.hidden = false;
    }
    btn.disabled = false;
    btn.textContent = 'Envoyer le message';
  });
}

/* ── BANDEAU COOKIES CNIL ────────────────────────── */
function cookieConsent(choice) {
  try { localStorage.setItem('ufb-cookie-consent', choice); } catch(_) {}
  document.getElementById('cookie-banner').classList.remove('visible');
}

(function initCookieBanner() {
  try {
    const stored = localStorage.getItem('ufb-cookie-consent');
    if (!stored) {
      document.getElementById('cookie-banner').classList.add('visible');
    }
  } catch(_) {
    document.getElementById('cookie-banner').classList.add('visible');
  }
})();
