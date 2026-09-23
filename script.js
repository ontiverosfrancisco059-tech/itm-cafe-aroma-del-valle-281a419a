// Café Aroma Del Valle — interacciones generales
(function(){
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }
  // Reveal on scroll
  var els = document.querySelectorAll('.dish,.gallery figure,.mini-product,.product,.split-copy,.split-media');
  els.forEach(function(el){ el.classList.add('reveal'); });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    },{threshold:.12});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('visible'); });
  }
  // Filtro simple de tienda (solo catálogo inicial visible; el runtime ITM carga aparte)
  var filterBtns = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-cat]');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function(c){
        c.style.display = (f === 'todos' || c.getAttribute('data-cat') === f) ? '' : 'none';
      });
    });
  });
  // Cantidad en ficha de producto
  var qty = document.getElementById('qtyVal');
  if(qty){
    var n = 1;
    document.querySelectorAll('[data-qty]').forEach(function(b){
      b.addEventListener('click', function(){
        n = Math.min(12, Math.max(1, n + parseInt(b.getAttribute('data-qty'),10)));
        qty.textContent = n;
      });
    });
  }
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
})();
