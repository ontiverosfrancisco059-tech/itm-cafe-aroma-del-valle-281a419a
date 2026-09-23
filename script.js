// Café Aroma Del Valle – interacciones generales
(function(){
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('menuPrincipal');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function(e){
      if(e.target.tagName === 'A') menu.classList.remove('open');
    });
  }

  // Horario dinámico simple
  var el = document.getElementById('horarioHoy');
  if(el){
    try{
      var d = new Date().getDay(); // 0 dom
      var txt = 'Lun a Vie 7:00 – 21:00';
      if(d === 6) txt = 'Hoy Sáb 8:00 – 22:00 · Abierto';
      else if(d === 0) txt = 'Hoy Dom 9:00 – 15:00 · Abierto';
      else txt = 'Hoy Lun a Vie 7:00 – 21:00 · Abierto';
      el.textContent = txt;
    }catch(e){}
  }

  // Filtros tienda (si existen en la página)
  var filterBtns = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-category]');
  if(filterBtns.length){
    filterBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        filterBtns.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        cards.forEach(function(c){
          var cat = c.getAttribute('data-category');
          c.style.display = (f === 'todos' || f === cat) ? '' : 'none';
        });
      });
    });
  }

  // Cantidad en ficha de producto
  var qty = document.getElementById('qtyVal');
  if(qty){
    var n = 1;
    document.querySelectorAll('[data-qty]').forEach(function(b){
      b.addEventListener('click', function(){
        var op = b.getAttribute('data-qty');
        if(op === 'plus') n++;
        if(op === 'minus' && n > 1) n--;
        qty.textContent = n;
      });
    });
  }
})();
