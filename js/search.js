/* search.js
   Client-side search across the data arrays.
   Usage: content.initSearch() is wired to a simple hash-based flow.
*/
(function(){
  function allItems(){
    const items = [];
    (window.jtVehicles || []).forEach(i=> items.push(Object.assign({__type:'vehicles'}, i)));
    (window.jtProducts || []).forEach(i=> items.push(Object.assign({__type:'products'}, i)));
    (window.jtNews || []).forEach(i=> items.push(Object.assign({__type:'news'}, i)));
    (window.jtBlogs || []).forEach(i=> items.push(Object.assign({__type:'blogs'}, i)));
    (window.jtGuides || []).forEach(i=> items.push(Object.assign({__type:'guides'}, i)));
    return items;
  }

  function match(item, q){
    q = q.toLowerCase();
    return (''+ (item.name||item.title||'')).toLowerCase().includes(q) ||
           (''+ (item.short||item.excerpt||'')).toLowerCase().includes(q) ||
           (''+ (item.description||item.content||'')).toLowerCase().includes(q) ||
           (''+ (item.category||'')).toLowerCase().includes(q);
  }

  function performSearch(q){
    if (!q) return [];
    const results = allItems().filter(i=>match(i,q));
    return results;
  }

  // Search display function for index.html or anywhere
  function showSearch(q){
    const results = performSearch(q);
    // Simple modal display
    const modal = document.createElement('div');
    modal.style.position='fixed';
    modal.style.left=0;modal.style.top=0;modal.style.right=0;modal.style.bottom=0;
    modal.style.background='rgba(0,0,0,0.6)';modal.style.zIndex=9999;modal.style.display='flex';modal.style.alignItems='center';modal.style.justifyContent='center';
    const box = document.createElement('div');
    box.style.width='90%';box.style.maxWidth='900px';box.style.maxHeight='80%';box.style.overflow='auto';box.style.background='#fff';box.style.padding='18px';box.style.borderRadius='8px';
    box.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><strong>Search results for "${q}"</strong><button id="close-search" class="btn">Close</button></div>`;
    if (results.length===0) {
      box.innerHTML += `<p class="muted">No results found</p>`;
    } else {
      const wrap = document.createElement('div');
      wrap.style.display='grid';wrap.style.gridTemplateColumns='repeat(auto-fill,minmax(220px,1fr))';wrap.style.gap='12px';
      results.slice(0,50).forEach(it=>{
        const a = document.createElement('a');
        a.href = (it.__type==='vehicles'?'vehicles/':'') + (it.slug || it.id) + '.html';
        a.style.textDecoration='none';a.style.color='inherit';
        a.innerHTML = `<div class="card small"><img style="height:90px;object-fit:cover;width:100%;border-radius:6px;margin-bottom:8px" src="${it.image||'images/hero/hero-offroad.svg'}" alt="${it.name||it.title}"><div class="meta">${it.__type}</div><h3>${it.name||it.title}</h3><div class="excerpt">${(it.short||it.excerpt||'')}</div></div>`;
        wrap.appendChild(a);
      });
      box.appendChild(wrap);
    }
    modal.appendChild(box);
    document.body.appendChild(modal);
    document.getElementById('close-search').addEventListener('click', ()=> modal.remove());
    modal.addEventListener('click', (e)=>{ if (e.target===modal) modal.remove(); });
  }

  // Expose a helper to show search from components if location.hash used
  window.showSearchFromHash = function(q){ showSearch(q); };

  // Also hook the global search input (if present)
  document.addEventListener('DOMContentLoaded', function(){
    const input = document.getElementById('site-search');
    if (!input) return;
    input.addEventListener('keydown', function(e){
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = this.value.trim();
        if (!q) return;
        showSearch(q);
      }
    });
  });

  // Quick binding for URL ?q= style in the future can be added here.
})();