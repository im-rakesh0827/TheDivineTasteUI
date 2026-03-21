document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const loader = document.getElementById("loaderOverlay");
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        try {
             showLoader();
            const formData = new FormData(form);

            const contactData = {
                name: (formData.get("name") || "").trim(),
                email: (formData.get("email") || "").trim(),
                subject: (formData.get("subject") || "").trim(),
                message: (formData.get("message") || "").trim()
            };

            if (!contactData.name || !contactData.email || !contactData.subject) {
                showToast("Name, Email & Subject are required!", "Warning", "warning");
                return;
            }

            let response;

            try {
                response = await fetch("http://localhost:5089/api/booking/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactData)
                });
            } catch (networkErr) {
                 hideLoader();
                showToast("Network error! Please try again.", "Error", "error");
                console.error("Network error:", networkErr);
                return;
            }

            let result = {};

            try { result = await response.json(); } catch {}
            await delay(1000);
             hideLoader();

            if (response.ok) {
                showToast(result.message || "Message sent successfully!", "Success", "success");
                form.reset();
            } else {
                showToast(result.error || "Failed to send message!", "Error", "error");
            }

        } catch (err) {
            loader.style.display = "none";
            showToast("Something went wrong!", "Error", "error");
            console.error("Unexpected error:", err);
        }
    });

});











