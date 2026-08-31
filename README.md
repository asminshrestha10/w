# JuneTrail — Static Website

This is a complete static website for JuneTrail (4x4 vehicles, products, news, blogs and guides) that runs on GitHub Pages.

Key features:
- Black-and-white professional theme
- Responsive layout (desktop → mobile)
- Client-side search (no backend)
- Data-driven content (edit data/*.js to add items)
- Separate pages for each featured item (vehicles/, products/, blog/, news/, guides/)
- Affiliate link placeholders ready to be replaced
- SEO basics (title, meta description, open graph)

Folder structure (important files):
- index.html, vehicles.html, products.html, news.html, blog.html, guides.html, about.html, contact.html
- vehicles/, products/, news/, blog/, guides/ (item pages)
- css/style.css
- js/components.js, js/content.js, js/search.js
- data/vehicles.js, data/products.js, data/news.js, data/blogs.js, data/guides.js
- images/ (logo and placeholders)

---

## How to edit content (easy steps for a beginner)

To add or edit items you only need to edit files in the `data/` folder and the placeholder images in `images/`.

Add a new vehicle
1. Open `data/vehicles.js`.
2. Copy one of the existing objects in the array and paste it at the end.
3. Edit fields: `id`, `slug`, `name`, `manufacturer`, `year`, `category`, `image`, `short`, `description`.
   - slug determines the file name used in `vehicles/<slug>.html`.
4. Create a new page: copy a template file (e.g. `vehicles/toyota-landcruiser-300.html`) and rename to `vehicles/<slug>.html`.
   - Update the title and the static content.
   - Change image path to point to `images/vehicles/<your-file>.svg` or .jpg
5. Add or replace image in `images/vehicles/` (see below how to add images).
6. Save and commit.

Add a new product
1. Open `data/products.js`.
2. Copy an object, edit fields (`id`, `slug`, `name`, `category`, `image`, `rating`, `short`, `pros`, `cons`, `affiliate`).
3. Create `products/<slug>.html` by copying an existing product page and updating content.
4. Replace placeholder image `images/products/<file>.svg`.

Add a new blog/news/guide
1. Edit `data/blogs.js` or `data/news.js` or `data/guides.js` — follow existing objects.
2. Create a matching HTML page in `blog/` or `news/` or `guides/`.
3. Update hero image and content.

Change an image
1. Replace the file in `images/...` with the new file (same filename) or
2. Update the `image` field in the relevant data file to the path of the new image.

Change an Amazon affiliate link
1. Open `data/products.js`.
2. Find the product's `affiliate` field and replace `YOUR_AMAZON_AFFILIATE_LINK_HERE` with your affiliate URL.

Change text
- Most content is in the data/*.js files and the item pages in vehicles/, products/, blog/, news/, guides/.
- Edit and save.

Delete an article
1. Remove the object from the data file (e.g. `data/blogs.js`).
2. Remove the corresponding HTML page from the folder (e.g. `blog/<slug>.html`).
3. Commit changes.

---

## GitHub Pages: Quick beginner instructions

1. Create a GitHub repository:
   - Log in to GitHub, click "New" (+) → "New repository".
   - Give it a name (e.g. `junetrail-site`), set to Public (or Private with Pages enabled), and click "Create repository".
2. Upload files:
   - In the repo, click "Add file" → "Upload files".
   - Drag-and-drop the entire folder structure (all files), or upload via Git from your computer.
   - Commit the upload.
3. Enable GitHub Pages:
   - In your repo, go to Settings → Pages.
   - Under "Source" select the branch (usually `main`) and folder `/ (root)`.
   - Save — your site will build and show a link (https://<username>.github.io/<repo>/).
4. Open the website:
   - Click the URL in the Pages settings, or browse to https://<username>.github.io/<repo>/.
5. Connect a custom domain:
   - Go to Settings → Pages → Custom domain and add your domain.
   - Follow GitHub instructions to add a CNAME and A records in your DNS provider.
6. Change website content:
   - Edit files in the repository (via GitHub web UI or locally via Git) and commit changes. GitHub will redeploy.
7. Add a new blog/product/vehicle:
   - Follow the steps above under "How to edit content" to add data and a page.
8. Add Amazon affiliate links:
   - Edit `data/products.js` and change the `affiliate` field.
9. Update images:
   - Replace image files in the `images/` folders; or upload a new file and update the `image` path in the data file.

---

If you want, I can:
- Output every placeholder SVG (I showed one example).
- Create all individual item HTML pages for every item in data/ (I included patterns and several examples; you can copy/paste the example and change the slug).
- Or produce a downloadable ZIP of the complete project for you to upload.
