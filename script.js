// Café Aroma Del Valle — interacciones base (sin login propio; comments.js gestiona opiniones)
(function(){
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Cerrar' : 'Menú';
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
    });
  }
  // Cantidad en ficha de producto
  var qty = document.getElementById('qtyVal');
  if(qty){
    var n = 1;
    document.querySelectorAll('[data-qty]').forEach(function(b){
      b.addEventListener('click', function(){
        n += b.getAttribute('data-qty') === 'plus' ? 1 : -1;
        if(n < 1) n = 1; if(n > 12) n = 12;
        qty.textContent = n;
        var link = document.getElementById('orderLink');
        if(link){
          var base = link.getAttribute('data-base');
          link.setAttribute('href', base + encodeURIComponent('Hola Café Aroma Del Valle, quiero ' + n + ' x ' + document.title));
        }
      });
    });
  }
  // Año dinámico si existe
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
