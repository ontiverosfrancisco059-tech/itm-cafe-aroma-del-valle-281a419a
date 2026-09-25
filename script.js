// Café Aroma Del Valle — interacciones de presentación únicamente.
// No implementa carrito, comentarios ni tienda propia: esos los hidrata el runtime ITM.
(function(){
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function(e){
      if(e.target.tagName === 'A') nav.classList.remove('open');
    });
  }
  var y = document.getElementById('year');
  if(y) y.textContent = String(new Date().getFullYear());
})();
