// Café Aroma Del Valle — interacciones base (menú móvil, reveal, catálogo /tienda; comentarios delegados a comments.js)
(function(){
  const $ = (s,c=document)=>c.querySelector(s);
  const $$ = (s,c=document)=>Array.from(c.querySelectorAll(s));

  // Año
  const y = $('#year'); if(y) y.textContent = new Date().getFullYear();

  // Menú móvil
  const btn = $('#menuBtn'); const nav = $('#mainNav');
  if(btn && nav){
    btn.addEventListener('click',()=>nav.classList.toggle('open'));
    nav.addEventListener('click',(e)=>{ if(e.target.closest('a')) nav.classList.remove('open'); });
  }

  // Reveal on scroll (con fallback si no hay IntersectionObserver)
  const revealEls = $$('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((es)=>{
      es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
    },{threshold:.12});
    revealEls.forEach(el=>io.observe(el));
  }else{
    revealEls.forEach(el=>el.classList.add('visible'));
  }

  const esc = (s)=>String(s==null?'':s).replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Carga preview de tienda en home + catálogo en /tienda
  async function loadProducts(){
    const preview = $('#storePreview');
    const catalog = $('#catalogGrid');
    if(!preview && !catalog) return;
    const urls = ['/store-products.json','./store-products.json','../store-products.json','store-products.json'];
    let data=null;
    for(const u of urls){
      try{ const r=await fetch(u,{cache:'no-store'}); if(r.ok){ data=await r.json(); break; } }catch(e){}
    }
    if(!data || !data.products) return;
    const fmt = n => '$'+Number(n).toFixed(0)+' MXN';
    const FALLBACK_IMG = 'https://itm-void-excepcional.pages.dev/media-fallback/imagen-generica.jpg';
    const imgTag = (p)=>`<img class="product-img" src="${esc(p.image||FALLBACK_IMG)}" alt="${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">`;
    if(preview){
      preview.innerHTML = data.products.slice(0,4).map(p=>`
        <article class="product">
          ${imgTag(p)}
          <div class="product-body"><h4>${esc(p.name)}</h4><p>${esc(p.description||'')}</p></div>
          <div class="product-foot"><span class="price">${fmt(p.price)}</span><a class="btn btn-small btn-ghost" href="/tienda">Ver</a></div>
        </article>`).join('');
    }
    if(catalog){
      const state = {cat:'Todos', q:''};
      const cats = ['Todos', ...new Set(data.products.map(p=>p.category))];
      const fWrap = $('#filters');
      function renderFilters(){
        if(!fWrap) return;
        fWrap.innerHTML = cats.map(c=>`<button class="filter-btn ${c===state.cat?'active':''}" data-cat="${c}">${c}</button>`).join('');
        $$('.filter-btn',fWrap).forEach(b=>b.addEventListener('click',()=>{state.cat=b.dataset.cat; renderFilters(); renderGrid();}));
      }
      const search = $('#searchInput');
      if(search) search.addEventListener('input',()=>{state.q=search.value.toLowerCase(); renderGrid();});
      function renderGrid(){
        const list = data.products.filter(p=>{
          const okCat = state.cat==='Todos' || p.category===state.cat;
          const okQ = !state.q || (p.name+' '+(p.description||'')).toLowerCase().includes(state.q);
          return okCat && okQ;
        });
        catalog.innerHTML = list.map(p=>`
          <article class="product" data-id="${esc(p.id)}">
            ${imgTag(p)}
            <div class="product-body">
              <span class="pill">${esc(p.category||'')}</span>
              <h4>${esc(p.name)}</h4><p>${esc(p.description||'')}</p>
              <small style="color:var(--muted)">${esc(p.unit||'')}</small>
            </div>
            <div class="product-foot">
              <span class="price">${fmt(p.price)}</span>
              <button class="btn btn-small" data-add="${esc(p.id)}">Agregar</button>
            </div>
          </article>`).join('') || '<p style="color:var(--muted)">Sin resultados.</p>';
        $$('[data-add]',catalog).forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.add)));
      }
      // Carrito simple en localStorage, pedido por teléfono
      const cart = JSON.parse(localStorage.getItem('aroma_cart')||'{}');
      function save(){ localStorage.setItem('aroma_cart',JSON.stringify(cart)); renderCart(); }
      function addToCart(id){ cart[id]=(cart[id]||0)+1; save(); }
      window._aromaClear = ()=>{ Object.keys(cart).forEach(k=>delete cart[k]); save(); };
      function renderCart(){
        const bar = $('#cartBar'); if(!bar) return;
        const ids = Object.keys(cart);
        const totalQty = ids.reduce((a,k)=>a+cart[k],0);
        const total = ids.reduce((a,k)=>{ const p=data.products.find(x=>x.id===k); return a+(p?p.price*cart[k]:0); },0);
        $('#cartText').textContent = totalQty===0 ? 'Tu selección está vacía.' : `${totalQty} artículo(s) — Total aprox. $${total.toFixed(0)} MXN. Pidelo por teléfono: 9811332914`;
        const wa = $('#orderBtn');
        if(wa){
          const lines = ids.map(k=>{ const p=data.products.find(x=>x.id===k); return p?`• ${p.name} x${cart[k]} ($${p.price*cart[k]})`:''; }).join('\n');
          const msg = encodeURIComponent(`Hola Café Aroma Del Valle, quiero pedir:\n${lines}\nTotal aprox: $${total.toFixed(0)} MXN`);
          wa.href = `https://wa.me/529811332914?text=${msg}`;
        }
      }
      const clearBtn = $('#clearBtn'); if(clearBtn) clearBtn.addEventListener('click',()=>window._aromaClear());
      renderFilters(); renderGrid(); renderCart();
    }
  }
  loadProducts();
})();
