async function loadChefs() {
    try {
        const response = await fetch("http://localhost:5089/api/About/allChefs");
        const chefs = await response.json();

        const container = document.getElementById("chefsContainer");
        container.innerHTML = "";

        chefs.forEach((chef, index) => {
            container.innerHTML += `
                <div class="col-lg-4 col-md-6">
                  <div class="member" data-aos="zoom-in" data-aos-delay="${(index + 1) * 100}">
                    <img src="${chef.imageUrl}" class="img-fluid" alt="">
                    <div class="member-info">
                      <div class="member-info-content">
                        <h4>${chef.name}</h4>
                        <span>${chef.designation}</span>
                      </div>
                      <div class="social">
                        <a href="${chef.twitterUrl}" target="_blank"><i class="bi bi-twitter"></i></a>
                        <a href="${chef.facebookUrl}" target="_blank"><i class="bi bi-facebook"></i></a>
                        <a href="${chef.instagramUrl}" target="_blank"><i class="bi bi-instagram"></i></a>
                        <a href="${chef.linkedinUrl}" target="_blank"><i class="bi bi-linkedin"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
            `;
        });

    } catch (e) {
        console.error("Error loading chefs:", e);
    }
}

// load on page start
document.addEventListener("DOMContentLoaded", loadChefs);
