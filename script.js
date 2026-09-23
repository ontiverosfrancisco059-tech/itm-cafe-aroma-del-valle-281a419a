// Café Aroma Del Valle — interacciones base (sin sistema propio de login/comentarios)
(function(){
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if(navToggle && mobileNav){
    navToggle.addEventListener('click', function(){
      var open = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mobileNav.classList.remove('open'); });
    });
  }
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Reveal on scroll
  var els = document.querySelectorAll('.menu-card, .product-card, .gallery-grid figure, .step, .info-block');
  els.forEach(function(el){ el.classList.add('reveal'); });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, {threshold:.12});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('visible'); });
  }

  // Filtro simple de tienda (solo UI, no inventa pedidos ni pagos)
  var filterBtns = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-category]');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function(c){
        c.style.display = (f === 'todos' || c.getAttribute('data-category') === f) ? '' : 'none';
      });
    });
  });

  // Cantidad en ficha de producto (solo visual, el pedido se confirma por WhatsApp)
  var qtyVal = document.getElementById('qtyVal');
  var qMinus = document.getElementById('qMinus');
  var qPlus = document.getElementById('qPlus');
  if(qtyVal && qMinus && qPlus){
    var q = 1;
    qMinus.addEventListener('click', function(){ q = Math.max(1, q-1); qtyVal.textContent = q; });
    qPlus.addEventListener('click', function(){ q = Math.min(12, q+1); qtyVal.textContent = q; });
  }
})();
