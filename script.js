// Café Aroma Del Valle — interacciones generales
(function(){
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
  var t=document.getElementById('navToggle'), l=document.getElementById('navLinks');
  if(t&&l){ t.addEventListener('click',function(){ var o=l.classList.toggle('open'); t.setAttribute('aria-expanded',o?'true':'false'); }); }

  // Catálogo inicial (editable). La tienda real se sincroniza vía runtime ITM en /tienda.
  var CATALOG=[
    {id:'grano-valle-500',name:'Café en Grano Aroma del Valle · 500 g',cat:'grano',price:249,img:'https://images.pexels.com/photos/9329115/pexels-photo-9329115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',alt:'Bolsa de café en grano premium',desc:'Arábica de altura, tueste medio. Notas a cacao y piloncillo.'},
    {id:'cold-brew-355',name:'Cold Brew Artesanal · 355 ml',cat:'bebidas',price:85,img:'https://images.pexels.com/photos/2873623/pexels-photo-2873623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',alt:'Café molido y cold brew embotellado',desc:'Infusión en frío por 18 horas. Listo para beber.'},
    {id:'capuchino-casa',name:'Capuchino de la Casa · 360 ml',cat:'bebidas',price:65,img:'https://images.pexels.com/photos/20541342/pexels-photo-20541342.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',alt:'Capuchino con arte latte',desc:'Espresso doble y leche texturizada. Solo en local o para llevar.'}
  ];
  function money(n){ return '$'+n.toLocaleString('es-MX'); }
  var hp=document.getElementById('homeProducts');
  if(hp){
    hp.innerHTML=CATALOG.map(function(p){
      return '<article class="card"><img loading="lazy" src="'+p.img+'" alt="'+p.alt+'"><div class="card-body"><h3>'+p.name+'</h3><p>'+p.desc+'</p><p class="price">'+money(p.price)+'</p><p><a class="btn btn-dark" href="tienda/producto-1.html">Ver producto</a> <a class="btn btn-gold" href="tienda/index.html">Comprar</a></p></div></article>';
    }).join('');
  }
})();
