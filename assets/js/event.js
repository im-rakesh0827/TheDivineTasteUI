let eventsSwiper = null;

document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
});

async function loadEvents() {
  try {
    const response = await fetch("http://localhost:5089/api/Event/getAllEvents");

    if (!response.ok) {
      throw new Error("Failed to load events");
    }

    const events = await response.json();
    const container = document.getElementById("eventsContainer");

    container.innerHTML = "";

    if (!events || events.length === 0) {
      container.innerHTML = `
        <div class="swiper-slide">
          <p class="text-center">No events available</p>
        </div>
      `;
      initSwiper();
      return;
    }

    events.forEach(event => {
      const pointsHtml = event.points
        ? event.points.split(",").map(p => `
            <li><i class="bi bi-check-circled"></i> ${p.trim()}</li>
          `).join("")
        : "";

      container.insertAdjacentHTML("beforeend", `
        <div class="swiper-slide">
          <div class="row event-item">
            <div class="col-lg-6">
              <img src="${event.imageUrl}" class="img-fluid" alt="${event.title}">
            </div>

            <div class="col-lg-6 pt-4 pt-lg-0 content">
              <h3>${event.title}</h3>

              <div class="price">
                <p><span>${event.priceText}</span></p>
              </div>

              <p class="fst-italic">
                ${event.subTitle}
              </p>

              <ul>
                ${pointsHtml}
              </ul>

              <p>
                ${event.description}
              </p>
            </div>
          </div>
        </div>
      `);
    });

    console.log("Slides loaded:", document.querySelectorAll(".swiper-slide").length);

    initSwiper();

  } catch (error) {
    console.error("Events load error:", error);
  }
}

function initSwiper() {

  // Destroy previous instance (CRITICAL FIX)
  if (eventsSwiper) {
    eventsSwiper.destroy(true, true);
    eventsSwiper = null;
  }

  eventsSwiper = new Swiper(".events-slider", {
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
    observer: true,
    observeParents: true
  });
}
