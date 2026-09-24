(()=>{const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const yearEl=$('#year');if(yearEl)yearEl.textContent=new Date().getFullYear();
const menuBtn=$('#menuBtn'),nav=$('#nav');
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open?'true':'false');});nav.addEventListener('click',e=>{if(e.target.tagName==='A')nav.classList.remove('open');});}
// Horario de hoy
const schedEl=$('#todaySchedule');
if(schedEl){const d=new Date().getDay();const map={0:'Dom 9:00 – 15:00',1:'Lun a Vie 7:00 – 21:00',2:'Lun a Vie 7:00 – 21:00',3:'Lun a Vie 7:00 – 21:00',4:'Lun a Vie 7:00 – 21:00',5:'Lun a Vie 7:00 – 21:00',6:'Sáb 8:00 – 22:00'};schedEl.textContent=map[d]||map[1];}
const fmt=n=>'$'+Number(n).toFixed(0)+' MXN';
async function loadProducts(){const urls=['./store-products.json','/store-products.json','../store-products.json'];for(const u of urls){try{const r=await fetch(u,{cache:'no-store'});if(r.ok){const j=await r.json();if(j.products)return j.products;}}catch(e){}}return[];}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function cardHTML(p){return `<article class="product-card"><img src="${esc(p.image)}" alt="${esc(p.image_alt||p.name)}" loading="lazy"><div class="product-body"><span class="badge">${esc(p.badge||p.category)}</span><h3>${esc(p.name)}</h3><p class="tiny">${esc(p.description)}</p><div class="product-foot"><span class="product-price">${fmt(p.price)}</span><small class="tiny">${esc(p.unit||'')}</small></div><button class="btn btn-dark btn-block" data-add="${esc(p.id)}">Agregar</button><a class="link" href="tel:+529811332914">Pedir por teléfono →</a></div></article>`;}
// preview en home
const preview=$('#previewGrid');
if(preview){loadProducts().then(list=>{const top=list.slice(0,3);preview.innerHTML=top.map(cardHTML).join('')||'<p>No se pudo cargar el catálogo.</p>';wireCart(list);});}
// carrito simple localStorage
function getCart(){try{return JSON.parse(localStorage.getItem('adv_cart')||'{}')}catch{return{}}}
function setCart(c){localStorage.setItem('adv_cart',JSON.stringify(c));renderCartCount();}
function renderCartCount(){$$('[data-cart-count]').forEach(el=>{const c=getCart();el.textContent=Object.values(c).reduce((a,b)=>a+b,0);});}
function wireCart(catalog){document.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;const id=b.getAttribute('data-add');const c=getCart();c[id]=(c[id]||0)+1;setCart(c);b.textContent='¡Agregado ✓';setTimeout(()=>b.textContent='Agregar',1200);});renderCartCount();}
renderCartCount();})();
