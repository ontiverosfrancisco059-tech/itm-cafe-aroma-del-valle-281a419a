// Café Aroma Del Valle — interacciones base (sin dependencias)
(function(){
  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('mobileNav');
  if(toggle && mobile){
    toggle.addEventListener('click', function(){
      var open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobile.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mobile.classList.remove('open'); });
    });
  }

  // Filtro simple de tienda (solo mejora progresiva; el runtime ITM carga el catálogo real)
  var filterBtns = document.querySelectorAll('[data-filter]');
  var seedCards = document.querySelectorAll('[data-category]');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      seedCards.forEach(function(card){
        var show = (f === 'todos' || card.getAttribute('data-category') === f);
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // Año dinámico si existe marcador
  var year = document.getElementById('year');
  if(year){ year.textContent = new Date().getFullYear(); }
})();
