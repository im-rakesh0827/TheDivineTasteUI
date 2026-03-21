// ----------------------
// Load About Info (List)
// ----------------------
async function loadInfo() {
    try {
        const response = await fetch("http://localhost:5089/api/About/aboutInfo");
        
        if (!response.ok) {
            console.error("API Error:", response.status);
            return;
        }

        const data = await response.json();

        const list = document.getElementById("infoList");
        list.innerHTML = "";

        data.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <i class="bi bi-check-circle"></i> 
                ${item.description}
            `;
            list.appendChild(li);
        });

    } catch (err) {
        console.error("Failed loading About Info", err);
    }
}

loadInfo();


// ----------------------
// Load "Why Us" Section
// ----------------------
async function loadWhyUs() {
    try {
        const response = await fetch("http://localhost:5089/api/About/aboutUs");

        if (!response.ok) {
            console.error("API Error:", response.status);
            return;
        }

        const data = await response.json();

        const container = document.getElementById("whyus-container");
        container.innerHTML = "";

        data.forEach((item, index) => {
            const delay = (index + 1) * 100;
            const number = (index + 1).toString().padStart(2, "0");

            container.innerHTML += `
                <div class="col-lg-4 mb-4 ${index === 0 ? '' : 'mt-4 mt-lg-0'}">
                    <div class="box" data-aos="zoom-in" data-aos-delay="${delay}">
                        <span>${number}</span>
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
        });

        // Reinitialize AOS after adding dynamic HTML
        if (AOS) {
            AOS.refresh();
        }

    } catch (err) {
        console.error("Failed to load Why Us section", err);
    }
}

// Load when DOM is ready
document.addEventListener("DOMContentLoaded", loadWhyUs);
