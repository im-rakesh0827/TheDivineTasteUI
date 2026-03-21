document.addEventListener("DOMContentLoaded", () => {
  loadGallery();
});

async function loadGallery() {
  const wrapper = document.getElementById("galleryWrapper");
  if (!wrapper) {
    console.error("galleryWrapper not found");
    return;
  }

  const apiUrl = "http://localhost:5089/api/About/allGallery"; 

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = await res.json();

    wrapper.innerHTML = "";

    if (!Array.isArray(items) || items.length === 0) {
      wrapper.innerHTML = `
        <div class="col-12">
          <p class="text-center">No gallery images available.</p>
        </div>`;
      return;
    }

    // Build grid items
    const html = items.map((it) => {
      const img = escapeHtml(it.imageUrl || '/assets/img/gallery/default.jpg');
      const title = escapeHtml(it.title || "");
      const desc = escapeHtml(it.description || "");

      return `
        <div class="col-lg-3 col-md-4">
          <div class="gallery-item">
            <a href="${img}" class="gallery-lightbox" data-gall="gallery-item" data-title="${title}" data-desc="${desc}">
              <img src="${img}" alt="${title}" class="img-fluid">
            </a>
          </div>
        </div>`;
    }).join("");

    wrapper.innerHTML = html;

    // initialize lightbox (GLightbox)
    initGalleryLightbox();

  } catch (err) {
    console.error("Failed to load gallery", err);
    wrapper.innerHTML = `
      <div class="col-12">
        <p class="text-center">Unable to load gallery at this time.</p>
      </div>`;
  }
}

function initGalleryLightbox() {
  // if GLightbox already exists, destroy (if your version supports it)
  if (window.galleryLightbox && typeof window.galleryLightbox.destroy === 'function') {
    try { window.galleryLightbox.destroy(); } catch (e) {}
  }

  // Small timeout to ensure DOM updated
  setTimeout(() => {
    window.galleryLightbox = GLightbox({
      selector: ".gallery-lightbox",
      openEffect: "zoom",
      closeEffect: "fade",
      plyr: { css: "", js: "" } // in case plugin tries to init video player
    });
  }, 30);
}

// escape helper
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
