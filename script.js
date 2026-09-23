document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// Filtro de menú
const chips = document.querySelectorAll('.chip');
const items = document.querySelectorAll('.menu-item');
chips.forEach(ch => ch.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  ch.classList.add('active');
  const f = ch.dataset.filter;
  items.forEach(it => {
    it.style.display = (f === 'all' || it.dataset.cat === f) ? '' : 'none';
  });
}));

// Lightbox galería
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbClose = document.getElementById('lightboxClose');
document.querySelectorAll('.g-item').forEach(b => b.addEventListener('click', () => {
  lbImg.src = b.dataset.full;
  lb.hidden = false;
}));
if (lbClose) lbClose.addEventListener('click', () => { lb.hidden = true; lbImg.src=''; });
if (lb) lb.addEventListener('click', e => { if (e.target === lb) { lb.hidden = true; lbImg.src=''; } });
