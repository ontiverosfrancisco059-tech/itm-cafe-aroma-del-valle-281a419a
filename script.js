// Café Aroma Del Valle — interacciones generales (no gestiona comentarios: eso lo hace comments.js)
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

  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Filtro de menú
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('#menuGrid .menu-card');
  filters.forEach(function(btn){
    btn.addEventListener('click', function(){
      filters.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function(c){
        var show = (f === 'all' || c.getAttribute('data-cat') === f);
        c.style.display = show ? '' : 'none';
      });
    });
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.menu-card, .gallery-grid figure, .shop-card, .hero-card, .store-banner');
  revealEls.forEach(function(el){ el.classList.add('reveal'); });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    },{threshold:.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('visible'); });
  }

  // Filtro simple de tienda (solo página /tienda)
  var shopFilters = document.querySelectorAll('[data-shop-filter]');
  var shopCards = document.querySelectorAll('[data-shop-cat]');
  if(shopFilters.length){
    shopFilters.forEach(function(btn){
      btn.addEventListener('click', function(){
        shopFilters.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-shop-filter');
        shopCards.forEach(function(c){
          var show = (f === 'all' || c.getAttribute('data-shop-cat') === f);
          c.style.display = show ? '' : 'none';
        });
      });
    });
  }
})();
