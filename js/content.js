/* content.js
   Renders lists and featured blocks using data in window.jtVehicles, jtProducts, jtNews, jtBlogs, jtGuides.
   Use renderList(type, container) and renderHome(options).
*/
const content = (function(){
  function createCard(item, type){
    // depending on type, create different card markup
    const card = document.createElement('article');
    card.className = 'card';
    const image = item.image || 'images/placeholder.svg';
    const title = item.title || item.name;
    const slug = item.slug || item.id;
    const linkBase = {
      vehicles: 'vehicles/',
      products: 'products/',
      news: 'news/',
      blogs: 'blog/',
      guides: 'guides/'
    }[type] || '';
    const pageExt = (type === 'blogs' || type === 'news') ? '/' : '/';
    const href = linkBase + (slug) + ( (type === 'blogs' || type === 'news' || type === 'vehicles' || type === 'products' || type === 'guides') ? '.html' : '.html' );
    const meta = (type==='vehicles') ? `${item.manufacturer || ''} • ${item.year || ''}` : (item.category || '');
    card.innerHTML = `
      <div class="card-image"><img src="${image}" alt="${title}"></div>
      <div class="meta">${meta || ''}</div>
      <h3>${title}</h3>
      <div class="excerpt">${(item.short || item.excerpt || '')}</div>
      <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
        <a class="btn" href="${href}">Read Review</a>
        ${type==='products'?`<a class="btn" target="_blank" rel="noopener noreferrer" href="${item.affiliate||'#'}">Check Price</a>`:''}
      </div>
    `;
    return card;
  }

  function renderList(type, selector){
    const container = document.querySelector(selector);
    if (!container) return;
    container.innerHTML = '';
    let data = [];
    switch(type){
      case 'vehicles': data = window.jtVehicles || []; break;
      case 'products': data = window.jtProducts || []; break;
      case 'news': data = window.jtNews || []; break;
      case 'blogs': data = window.jtBlogs || []; break;
      case 'guides': data = window.jtGuides || []; break;
      default: data = [];
    }
    data.forEach(item=>{
      container.appendChild(createCard(item, type));
    });
  }

  function renderHome(opts){
    opts = opts || {};
    const vEl = document.querySelector(opts.vehiclesEl || '#featured-vehicles');
    const pEl = document.querySelector(opts.productsEl || '#featured-products');
    const nEl = document.querySelector(opts.newsEl || '#latest-news');
    const bEl = document.querySelector(opts.blogsEl || '#latest-blogs');
    const gEl = document.querySelector(opts.guidesEl || '#latest-guides');
    const limit = opts.itemsLimit || 6;

    (window.jtVehicles || []).slice(0,limit).forEach(v=>{
      if (vEl) vEl.appendChild(createCard(v,'vehicles'));
    });
    (window.jtProducts || []).slice(0,limit).forEach(p=>{
      if (pEl) pEl.appendChild(createCard(p,'products'));
    });
    (window.jtNews || []).slice(0,limit).forEach(n=>{
      if (nEl) nEl.appendChild(createCard(n,'news'));
    });
    (window.jtBlogs || []).slice(0,limit).forEach(b=>{
      if (bEl) bEl.appendChild(createCard(b,'blogs'));
    });
    (window.jtGuides || []).slice(0,limit).forEach(g=>{
      if (gEl) gEl.appendChild(createCard(g,'guides'));
    });
  }

  function renderRelated(type, selector, count){
    const el = document.querySelector(selector);
    if (!el) return;
    let data = (type==='products') ? window.jtProducts : (type==='blogs') ? window.jtBlogs : [];
    (data || []).slice(0, count || 3).forEach(item=>{
      const card = createCard(item, type==='blogs'?'blogs':'products');
      card.classList.add('small');
      el.appendChild(card);
    });
  }

  return { renderList, renderHome, renderRelated };
})();