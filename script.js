// Café Aroma Del Valle — interacciones generales (no interfiere con comments.js)
(function(){
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.classList.remove('open'); });
    });
  }
  // Revelado suave
  var els = document.querySelectorAll('.card, .mini-card, .gallery figure, .section-head, .visit-info, .profile-card, .comments-card');
  els.forEach(function(el){ el.classList.add('reveal'); });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, {threshold:.12});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('visible'); });
  }
  // Filtro simple del catálogo semilla en tienda (progresivo, no rompe runtime ITM)
  var filterBtns = document.querySelectorAll('[data-filter]');
  var seedCards = document.querySelectorAll('[data-seed-category]');
  if(filterBtns.length && seedCards.length){
    filterBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        filterBtns.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        seedCards.forEach(function(card){
          var show = (f === 'todo' || card.getAttribute('data-seed-category') === f);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
})();
