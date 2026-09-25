// Café Aroma Del Valle — interacciones de presentación únicamente.
// No implementa carrito, checkout, inventario ni comentarios: eso lo hidrata el runtime ITM (tienda) y comments.js.
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
  // Cierre suave del detalle de tienda si el runtime lo marca como abierto (solo UX, sin lógica de datos)
  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-itm-detail-close]');
    if(!t) return;
    var modal = t.closest('[data-itm-product-detail]');
    if(modal) modal.classList.remove('open');
  });
})();
