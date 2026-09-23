// Café Aroma Del Valle — interacciones generales
(function(){
  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobileNav');
  if(burger && mobileNav){
    burger.addEventListener('click', function(){
      var open = mobileNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mobileNav.classList.remove('open'); });
    });
  }
  // Tabs del menú
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      var name = tab.getAttribute('data-tab');
      document.querySelectorAll('.menu-panel').forEach(function(p){
        p.classList.toggle('active', p.id === 'panel-' + name);
      });
    });
  });
  // Año dinámico
  var y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }
  // Sombra del header al hacer scroll
  var header = document.querySelector('.header');
  function onScroll(){
    if(!header) return;
    header.style.boxShadow = window.scrollY > 10 ? '0 10px 30px rgba(0,0,0,.4)' : 'none';
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();
