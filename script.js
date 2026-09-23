// Café Aroma Del Valle — interacciones generales
(function(){
  var toggle=document.getElementById('menuToggle');
  var nav=document.getElementById('mainNav');
  if(toggle&&nav){toggle.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
  });
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open')})});
  }
  // Filtro carta
  var chips=document.querySelectorAll('.chip[data-filter]');
  var cards=document.querySelectorAll('#menuGrid .menu-card');
  chips.forEach(function(c){c.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.remove('active')});c.classList.add('active');
    var f=c.getAttribute('data-filter');
    cards.forEach(function(card){
      card.style.display=(f==='all'||card.getAttribute('data-cat')===f)?'':'none';
    });
  })});
  // Reveal on scroll
  var els=document.querySelectorAll('.menu-card,.visit-card,.widget-card,.product-card,.gallery figure');
  els.forEach(function(e){e.classList.add('reveal')});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('visible');io.unobserve(en.target)}});
    },{threshold:.12});
    els.forEach(function(e){io.observe(e)});
  }else{els.forEach(function(e){e.classList.add('visible')})}

  // Catálogo semilla de tienda (solo si el runtime ITM no ha cargado productos)
  var seed=[
    {id:'grano-valle-500',name:'Café en Grano Valle · 500 g',cat:'Grano',price:249,desc:'Mezcla de la casa, tueste medio, notas a chocolate y piloncillo.',img:'https://images.pexels.com/photos/28411627/pexels-photo-28411627.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
    {id:'kit-regalo-aroma',name:'Kit Regalo Aroma',cat:'Regalos',price:399,desc:'Bolsa de 250 g + taza cerámica en empaque kraft listo para regalar.',img:'https://images.pexels.com/photos/29795387/pexels-photo-29795387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
    {id:'molido-espresso-250',name:'Molido Espresso Insignia · 250 g',cat:'Molido',price:165,desc:'Molienda fina para espresso en casa, crema densa y final intenso.',img:'https://images.pexels.com/photos/14704217/pexels-photo-14704217.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
    {id:'mezcla-capuchino-1kg',name:'Mezcla Capuchino Casa · 1 kg',cat:'Grano',price:459,desc:'Ideal para leche: dulce, cremoso, rinde 60 tazas.',img:'https://images.pexels.com/photos/2096840/pexels-photo-2096840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
    {id:'cold-brew-1l',name:'Cold Brew Valle · 1 L',cat:'Bebidas',price:120,desc:'Extracción en frío 12 h, embotellado del día. Sirve con hielo.',img:'https://images.pexels.com/photos/4869289/pexels-photo-4869289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
    {id:'caja-reposteria',name:'Caja Repostería + Café 250 g',cat:'Repostería',price:220,desc:'4 croissants de mantequilla + bolsa de 250 g para el fin de semana.',img:'https://images.pexels.com/photos/27846221/pexels-photo-27846221.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}
  ];
  function money(n){return '$'+n.toFixed(2)+' MXN'}
  function renderSeed(container){
    if(!container||container.dataset.seeded==='1')return;
    if(container.children.length>0)return; // el runtime ITM ya cargó productos
    container.dataset.seeded='1';
    seed.forEach(function(p){
      var a=document.createElement('a');
      a.className='product-card';a.href=(p.id==='grano-valle-500')?'producto-1.html':'producto-1.html';
      a.style.textDecoration='none';a.style.color='inherit';
      a.innerHTML='<img src="'+p.img+'" alt="'+p.name+'" loading="lazy"><div class="product-body"><span class="product-cat">'+p.cat+'</span><h3>'+p.name+'</h3><p class="muted">'+p.desc+'</p><span class="product-price">'+money(p.price)+'</span><span class="btn btn-dark" style="text-align:center">Ver producto</span></div>';
      container.appendChild(a);
    });
  }
  // Intentar después de dar oportunidad al runtime ITM
  setTimeout(function(){
    document.querySelectorAll('[data-itm-store-products]').forEach(renderSeed);
    var fallback=document.getElementById('seedCatalog');
    if(fallback&&document.querySelector('[data-itm-store-products]')&&document.querySelector('[data-itm-store-products]').children.length>0){
      fallback.style.display='none';
    }
  },1800);
  window.ITMSeedCatalog={seed:seed,render:renderSeed};
})();
