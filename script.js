// Café Aroma Del Valle — interacciones generales (sin sistema propio de comentarios: lo gestiona comments.js)
(function(){
  var navToggle=document.getElementById('navToggle');
  var nav=document.getElementById('mainNav');
  if(navToggle&&nav){navToggle.addEventListener('click',function(){var o=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',o?'true':'false');});}

  var y=document.getElementById('year'); if(y){y.textContent=new Date().getFullYear();}

  // Filtro de carta (home)
  var tabs=document.querySelectorAll('.tab[data-filter]');
  var cards=document.querySelectorAll('#menuGrid .card');
  tabs.forEach(function(t){t.addEventListener('click',function(){
    tabs.forEach(function(x){x.classList.remove('active');}); t.classList.add('active');
    var f=t.getAttribute('data-filter');
    cards.forEach(function(c){c.style.display=(f==='all'||c.getAttribute('data-cat')===f)?'':'none';});
  });});

  // Filtro de tienda
  var fBtns=document.querySelectorAll('[data-shop-filter]');
  var pCards=document.querySelectorAll('[data-shop-cat]');
  function applyShop(f){
    pCards.forEach(function(c){c.style.display=(f==='all'||c.getAttribute('data-shop-cat')===f)?'':'none';});
    fBtns.forEach(function(b){b.classList.toggle('active',b.getAttribute('data-shop-filter')===f);});
  }
  fBtns.forEach(function(b){b.addEventListener('click',function(){applyShop(b.getAttribute('data-shop-filter'));});});
  var checks=document.querySelectorAll('[data-shop-check]');
  checks.forEach(function(ch){ch.addEventListener('change',function(){
    var act=Array.prototype.filter.call(checks,function(c){return c.checked;}).map(function(c){return c.value;});
    pCards.forEach(function(card){card.style.display=(act.length===0||act.indexOf(card.getAttribute('data-shop-cat'))>-1)?'':'none';});
  });});

  // Consulta por WhatsApp (tienda): no es pago ni pedido confirmado, solo solicitud de disponibilidad
  var WA='https://wa.me/529811332914';
  function wa(msg){return WA+'?text='+encodeURIComponent(msg);}
  document.querySelectorAll('[data-consult]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var name=btn.getAttribute('data-consult')||'producto';
      window.open(wa('Hola Café Aroma Del Valle, me interesa: '+name+'. ¿Me confirman disponibilidad y entrega?'),'_blank');
    });
  });

  // Cantidad en ficha de producto
  var q=1, qOut=document.getElementById('qtyOut');
  var qMinus=document.getElementById('qtyMinus'), qPlus=document.getElementById('qtyPlus');
  var qBtn=document.getElementById('qtyConsult');
  function paintQ(){if(qOut){qOut.textContent=q;}}
  if(qMinus){qMinus.addEventListener('click',function(){q=Math.max(1,q-1);paintQ();});}
  if(qPlus){qPlus.addEventListener('click',function(){q=Math.min(20,q+1);paintQ();});}
  if(qBtn){qBtn.addEventListener('click',function(){
    var n=qBtn.getAttribute('data-name')||'Mezcla Aroma del Valle 500 g';
    window.open(wa('Hola Café Aroma Del Valle, me interesan '+q+' pieza(s) de: '+n+'. ¿Me confirman disponibilidad?'),'_blank');
  });}
  paintQ();

  // Reveal on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.card,.reviews-how,.reviews-widget,.split-media,.hero-card').forEach(function(el){el.classList.add('reveal');io.observe(el);});
})();
