

document.getElementById("bookingForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    showLoader();      
    const bookingData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        people: parseInt(document.getElementById("people").value),
        message: document.getElementById("message").value.trim()
    };

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const response = await fetch("http://localhost:5089/api/Booking/bookTable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData)
        });
        

        hideLoader();
        hideAllToasts();

        if (response.ok) {
            const result = await response.json();
            showToast(result.message || 'Booking successful!', 'Success', 'success');
            document.getElementById("bookingForm").reset();
        } else {
            const err = await response.json();
            showToast(err.error || 'Booking failed. Please try again.', 'Error', 'error');
        }
    } catch (error) {
        hideLoader();
        hideAllToasts();
        showToast('Something went wrong. Please try again.', 'Error', 'error');
        console.error("API call error:", error);
    }
});






// document.addEventListener("DOMContentLoaded", function () {
//     loadBookings();
// });

// async function loadBookings() {
//     const url = "http://localhost:5089/api/Booking/allBooking";
//     const loader = document.getElementById("loader");
//     const bookingBody = document.getElementById("bookingBody");

//     loader.style.display = "block"; // Show loader

//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             ShowToastAlert("Failed to load bookings", "Error", "error");
//             loader.style.display = "none";
//             return;
//         }

//         const data = await response.json();

//         bookingBody.innerHTML = ""; // Clear before loading

//         if (data.length === 0) {
//             bookingBody.innerHTML = `<tr><td colspan="8" class="text-center">No bookings found.</td></tr>`;
//             loader.style.display = "none";
//             return;
//         }

//         data.forEach(item => {
//             const row = `
//                 <tr>
//                     <td>${item.name}</td>
//                     <td>${item.email}</td>
//                     <td>${item.phone}</td>
//                     <td>${item.date}</td>
//                     <td>${item.time}</td>
//                     <td>${item.people}</td>
//                     <td>${item.message ?? ""}</td>
//                     <td>${formatDateTime(item.createdAt)}</td>
//                 </tr>
//             `;
//             bookingBody.innerHTML += row;
//         });

//         ShowToastAlert("Bookings loaded successfully", "Success", "success");

//     } catch (error) {
//         console.error("Error:", error);
//         ShowToastAlert("Something went wrong while loading bookings", "Error", "error");
//     }

//     loader.style.display = "none"; // Hide loader
// }

// // Convert date format nicely
// function formatDateTime(dateString) {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleString();
// }


