// Café Aroma Del Valle — interacciones base (sin dependencias)
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
  // Filtros de tienda
  var filterBtns = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-category]');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function(c){
        c.style.display = (f === 'todo' || c.getAttribute('data-category') === f) ? '' : 'none';
      });
    });
  });
  // Pedido por teléfono (sin pagos en línea: se coordina por llamada)
  var orderBtns = document.querySelectorAll('[data-order]');
  orderBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var name = btn.getAttribute('data-order');
      var qtyEl = document.getElementById('cantidad');
      var qty = qtyEl ? qtyEl.value : '1';
      var msg = 'Hola, Café Aroma Del Valle. Quiero pedir ' + qty + ' x ' + name + ' para recoger en local.';
      // Se abre marcador tel: el visitante confirma por llamada
      window.location.href = 'tel:+5219811332914';
      if(navigator.clipboard){ navigator.clipboard.writeText(msg).catch(function(){}); }
      alert(msg + '\n\nSe copió tu mensaje. Llámanos al 981 133 2914 para confirmar.');
    });
  });
  // Año dinámico si existe
  var y = document.getElementById('anio');
  if(y){ y.textContent = new Date().getFullYear(); }
})();
