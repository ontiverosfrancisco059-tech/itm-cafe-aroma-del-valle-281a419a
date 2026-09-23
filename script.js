// Café Aroma Del Valle — interacciones del sitio principal
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

  // Resaltado de sección activa
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var map = {};
  links.forEach(function(a){ map[a.getAttribute('href')] = a; });
  if('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && map['#'+e.target.id]){
          links.forEach(function(a){ a.style.color=''; });
          map['#'+e.target.id].style.color = '#fff';
        }
      });
    }, {rootMargin:'-40% 0px -55% 0px'});
    ['nosotros','menu','local','galeria','opiniones','contacto'].forEach(function(id){
      var el = document.getElementById(id);
      if(el) obs.observe(el);
    });
  }

  // Año dinámico si se usa en el futuro
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });
})();
