// Café Aroma Del Valle — interacciones ligeras. Sin carrito propio ni login propio.
(function(){
  const btn=document.getElementById('menuBtn');
  const nav=document.getElementById('nav');
  if(btn&&nav){btn.addEventListener('click',()=>nav.classList.toggle('open'));}
  // Cierre de menú al navegar
  if(nav){nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));}
  // Año dinámico si existe
  const y=document.querySelectorAll('[data-year]');
  y.forEach(el=>el.textContent=new Date().getFullYear());
  // Realce de sección activa (solo visual)
  const links=[...document.querySelectorAll('.nav a[href^="#"]')];
  const secs=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if('IntersectionObserver' in window && secs.length){
    const obs=new IntersectionObserver(es=>{
      es.forEach(e=>{
        if(e.isIntersecting){
          links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));
        }
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    secs.forEach(s=>obs.observe(s));
  }
})();
