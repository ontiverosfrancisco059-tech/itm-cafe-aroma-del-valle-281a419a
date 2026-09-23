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
  // Resaltado suave de sección activa
  var links = document.querySelectorAll('.main-nav a[href^="#"]');
  var map = {};
  links.forEach(function(a){ map[a.getAttribute('href').slice(1)] = a; });
  if('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && map[e.target.id]){
          links.forEach(function(l){ l.style.color=''; });
          map[e.target.id].style.color = '#a8842f';
        }
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    Object.keys(map).forEach(function(id){
      var s = document.getElementById(id);
      if(s) obs.observe(s);
    });
  }
  // Año dinámico si existe
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
