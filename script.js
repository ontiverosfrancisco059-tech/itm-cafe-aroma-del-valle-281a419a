// Café Aroma Del Valle — interacciones base (sin lógica de tienda ni comentarios propios)
(function(){
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('mobileNav');
  if(btn && nav){
    btn.addEventListener('click', function(){
      var open = nav.hasAttribute('hidden');
      if(open){ nav.removeAttribute('hidden'); btn.setAttribute('aria-expanded','true'); }
      else{ nav.setAttribute('hidden',''); btn.setAttribute('aria-expanded','false'); }
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.setAttribute('hidden',''); btn.setAttribute('aria-expanded','false'); });
    });
  }

  // Reveal suave con IntersectionObserver
  var els = document.querySelectorAll('.product-feat, .media-card, .gallery figure, .cta-box');
  if('IntersectionObserver' in window && els.length){
    els.forEach(function(el){ el.style.opacity='0'; el.style.transform='translateY(12px)'; el.style.transition='opacity .5s, transform .5s'; });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.style.opacity='1'; e.target.style.transform='none'; io.unobserve(e.target); }
      });
    },{threshold:.12});
    els.forEach(function(el){ io.observe(el); });
  }
})();
