document.addEventListener("DOMContentLoaded", () => {
    loadTestimonials();
});

async function loadTestimonials() {
    const wrapper = document.getElementById("testimonialsWrapper");

    if (!wrapper) {
        console.error("testimonialsWrapper not found in DOM!");
        return;
    }

    
    const apiUrl = `${CONFIG.BASE_URL}/api/About/allTestimonials`;

    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const testimonials = await res.json();

        // Clear wrapper first
        wrapper.innerHTML = "";

        if (!Array.isArray(testimonials) || testimonials.length === 0) {
            wrapper.innerHTML = `
              <div class="swiper-slide">
                <div class="testimonial-item">
                  <p>No testimonials available.</p>
                </div>
              </div>`;
            initTestimonialSwiper();
            return;
        }

        const html = testimonials.map(t => `
            <div class="swiper-slide">
                <div class="testimonial-item">
                  <p>
                    <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                    ${escapeHtml(t.message)}
                    <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                  </p>
                  <img src="${t.imageUrl}" class="testimonial-img" alt="${escapeHtml(t.author)}">
                  <h3>${escapeHtml(t.author)}</h3>
                  <h4>${escapeHtml(t.role)}</h4>
                </div>
            </div>
        `).join("");

        wrapper.innerHTML = html;

        initTestimonialSwiper();

    } catch (error) {
        console.error("Failed to load testimonials:", error);
        wrapper.innerHTML = `
          <div class="swiper-slide">
            <div class="testimonial-item">
              <p>Error loading testimonials!</p>
            </div>
          </div>`;
        initTestimonialSwiper();
    }
}

function initTestimonialSwiper() {
    // Destroy old swiper (prevents classList errors)
    if (window.testimonialSwiper) {
        try { window.testimonialSwiper.destroy(true, true); } catch (e) {}
    }

    setTimeout(() => {
        window.testimonialSwiper = new Swiper(".testimonials-slider", {
            speed: 600,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
            }
        });
    }, 50);
}

// Prevent XSS
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
