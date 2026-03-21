async function loadSpecials() {
    try {
        
        const response = await fetch(`${CONFIG.BASE_URL}/api/Menu/getSpecialMenu`);

        if (!response.ok) {
            console.error("API returned error:", response.status);
            return;
        }

        const specials = await response.json();

        if (!Array.isArray(specials) || specials.length === 0) {
            console.warn("No specials found.");
            return;
        }

        const tabList = document.querySelector(".nav-tabs");
        const tabContent = document.querySelector(".tab-content");

        if (!tabList || !tabContent) {
            console.error("Tab containers not found in DOM");
            return;
        }

        tabList.innerHTML = "";
        tabContent.innerHTML = "";

        specials.forEach((item, index) => {

            // FIX: sanitize ID
            const tabId = (item.tabKey || item.TabKey || `tab${index}`)
                .replace(/\s+/g, "-")
                .toLowerCase();

            const title = item.title || item.Title || "";
            const subTitle = item.subTitle || item.SubTitle || "";
            const description = item.description || item.Description || "";
            const imageUrl = item.imageUrl || item.ImageUrl || "";

            // ----- Create Tab Header -----
            const tab = document.createElement("li");
            tab.classList.add("nav-item");
            tab.innerHTML = `
                <a class="nav-link ${index === 0 ? "active show" : ""}"
                   data-bs-toggle="tab"
                   href="#${tabId}">
                   ${title}
                </a>
            `;
            tabList.appendChild(tab);

            // ----- Create Tab Content -----
            const content = document.createElement("div");
            content.classList.add("tab-pane", ...(index === 0 ? ["active", "show"] : []));
            content.id = tabId;
            content.innerHTML = `
                <div class="row">
                    <div class="col-lg-8 details order-2 order-lg-1">
                        <h3>${title}</h3>
                        <p class="fst-italic">${subTitle}</p>
                        <p>${description}</p>
                    </div>
                    <div class="col-lg-4 text-center order-1 order-lg-2">
                        <img src="${imageUrl}" class="img-fluid" alt="${title}">
                    </div>
                </div>
            `;

            tabContent.appendChild(content);
        });

    } catch (err) {
        console.error("Failed to load specials", err);
    }
}

document.addEventListener("DOMContentLoaded", loadSpecials);
