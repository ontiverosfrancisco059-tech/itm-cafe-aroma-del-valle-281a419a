// Café Aroma Del Valle — interacciones del sitio (sin sistema propio de usuarios/comentarios).
(function () {
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  // Galería con lightbox
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightboxImg');
  var closeBtn = document.getElementById('lightboxClose');
  function closeBox() { if (box) box.hidden = true; }
  document.querySelectorAll('#gallery .g-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.getAttribute('data-full');
      var img = btn.querySelector('img');
      if (box && boxImg && src) {
        boxImg.src = src;
        boxImg.alt = img ? img.alt : 'Imagen ampliada';
        box.hidden = false;
      }
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', closeBox);
  if (box) box.addEventListener('click', function (e) { if (e.target === box) closeBox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });

  // Filtros del catálogo inicial (solo presentación, no toca el runtime ITM)
  var filterBtns = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-cat]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function (c) {
        c.style.display = (f === 'todos' || c.getAttribute('data-cat') === f) ? '' : 'none';
      });
    });
  });

  // Año dinámico si existe
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
