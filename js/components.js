/* components.js
   Injects header and footer and handles mobile menu and search activation.
*/
const components = (function(){
  function buildHeader(){
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
      <div class="brand">
        <img src="images/logo/junetrail_blue_logo.svg" alt="JuneTrail logo" />
        <a class="brand-text" href="index.html">JUNETRAIL</a>
      </div>
      <nav class="nav" aria-label="Main navigation">
        <div class="dropdown">
          <a href="index.html">Home</a>
        </div>
        <div class="dropdown">
          <a href="vehicles.html">Vehicles</a>
        </div>
        <div class="dropdown">
          <a href="products.html">Products</a>
        </div>
        <div class="dropdown">
          <a href="news.html">News</a>
        </div>
        <div class="dropdown">
          <a href="blog.html">Blog</a>
        </div>
        <div class="dropdown">
          <a href="guides.html">Guides</a>
        </div>
        <div class="dropdown">
          <a href="about.html">About</a>
        </div>
        <div class="dropdown">
          <a href="contact.html">Contact</a>
        </div>
        <div class="search">
          <input id="site-search" placeholder="Search vehicles, products, articles..." aria-label="Search" />
        </div>
      </nav>
      <button class="hamburger" aria-label="Open menu">&#9776;</button>
    `;
    return header;
  }

  function buildFooter(){
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="col">
          <div style="display:flex;align-items:center;gap:12px">
            <img src="images/logo/junetrail_blue_logo.svg" alt="JuneTrail logo" style="height:44px"/>
            <div>
              <div style="font-weight:800;font-family:Merriweather, serif">JUNETRAIL</div>
              <div class="muted" style="font-size:13px">4x4 vehicles, engineering-first reviews and guides</div>
            </div>
          </div>
          <div class="social" aria-hidden="true">
            <a href="#" title="Facebook">Facebook</a> ·
            <a href="#" title="Instagram">Instagram</a> ·
            <a href="#" title="YouTube">YouTube</a> ·
            <a href="#" title="TikTok">TikTok</a>
          </div>
        </div>
        <div class="col">
          <h4>Navigate</h4>
          <div><a href="index.html">Home</a> · <a href="vehicles.html">Vehicles</a> · <a href="products.html">Products</a></div>
          <div><a href="news.html">News</a> · <a href="blog.html">Blog</a> · <a href="guides.html">Guides</a></div>
          <div><a href="about.html">About</a> · <a href="contact.html">Contact</a></div>
        </div>
        <div class="col">
          <h4>Legal</h4>
          <div><a href="#">Privacy Policy</a></div>
          <div><a href="#">Affiliate Disclosure</a></div>
          <div><a href="#">Terms</a></div>
        </div>
      </div>
    `;
    return footer;
  }

  function init(){
    // Insert header and footer into page
    const headerEl = document.getElementById('site-header');
    if (headerEl) headerEl.appendChild(buildHeader());

    const footerEl = document.getElementById('site-footer');
    if (footerEl) footerEl.appendChild(buildFooter());

    // Mobile menu toggle (simple)
    document.querySelectorAll('.hamburger').forEach(btn=>{
      btn.addEventListener('click', ()=> {
        const nav = document.querySelector('.nav');
        if (!nav) return;
        nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
      });
    });

    // Search input handler
    const searchInput = document.getElementById('site-search');
    if (searchInput) {
      searchInput.addEventListener('keydown', function(e){
        if (e.key === 'Enter') {
          e.preventDefault();
          const q = this.value.trim();
          if (!q) { alert('Enter search text'); return; }
          window.location.href = 'index.html#search=' + encodeURIComponent(q);
        }
      });
    }

    // If page loaded with index.html#search=query, open search results
    if (location.hash && location.hash.startsWith('#search=')) {
      const q = decodeURIComponent(location.hash.replace('#search=',''));
      if (q) {
        // Simple redirect to index then show results
        // If content.searchRender exists show; else rely on search.js
        if (window.showSearchFromHash) window.showSearchFromHash(q);
      }
    }
  }

  return { init };
})();