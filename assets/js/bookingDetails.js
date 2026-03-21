/* =========================
   DataTable Custom Filter
========================= */

$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {

        let selectedStatus = $("#statusFilter").val();

        if (selectedStatus === "All") {
            return true;
        }

        let table = $('#bookingTable').DataTable();
        let rowNode = table.row(dataIndex).node();
        let rowStatus = $(rowNode).data("status");

        return rowStatus == selectedStatus;
    }
);


$(document).ready(function () {

    loadBookings();

    /* =========================
       Select All Approve
    ========================= */

    $(document).on("change", "#selectApproveAll", function () {

        let isChecked = $(this).is(":checked");

        $(".approveCheck:not(:disabled)").prop("checked", isChecked);

        if (isChecked) {
            $(".rejectCheck:not(:disabled)").prop("checked", false);
            $("#selectRejectAll").prop("checked", false);
        }

        toggleSaveButton();

    });


    /* =========================
       Select All Reject
    ========================= */

    $(document).on("change", "#selectRejectAll", function () {

        let isChecked = $(this).is(":checked");

        $(".rejectCheck:not(:disabled)").prop("checked", isChecked);

        if (isChecked) {
            $(".approveCheck:not(:disabled)").prop("checked", false);
            $("#selectApproveAll").prop("checked", false);
        }

        toggleSaveButton();

    });


    /* =========================
       Row Approve Checkbox
    ========================= */

    $(document).on("change", ".approveCheck", function () {

        let row = $(this).closest("tr");

        if ($(this).is(":checked")) {
            row.find(".rejectCheck").prop("checked", false);
        }

        toggleSaveButton();

    });


    /* =========================
       Row Reject Checkbox
    ========================= */

    $(document).on("change", ".rejectCheck", function () {

        let row = $(this).closest("tr");

        if ($(this).is(":checked")) {
            row.find(".approveCheck").prop("checked", false);
        }

        toggleSaveButton();

    });


    /* =========================
       Status Filter
    ========================= */

    $("#statusFilter").on("change", function () {
        filterBookings();
    });

});


/* =========================
   Enable / Disable Save Button
========================= */

function toggleSaveButton() {

    let selectedRows = $(".approveCheck:checked:not(:disabled), .rejectCheck:checked:not(:disabled)").length;

    $("#updateStatus").prop("disabled", selectedRows === 0);

}


/* =========================
   Load Booking Records
========================= */

function loadBookings() {
    // fetch("http://localhost:5089/api/Booking/allBooking")
    fetch(`${CONFIG.BASE_URL}/api/Booking/allBooking`)

        .then(response => response.json())

        .then(data => {

            let rows = "";

            data.forEach(b => {

                    let approveChecked = "";
                    let rejectChecked = "";
                    let approveDisabled = "";
                    let rejectDisabled = "";
                    let noteDisabled = "";

                    if (b.isApproved === 1) {
                         approveChecked = "checked";
                         approveDisabled = "disabled";
                         rejectDisabled = "disabled";
                         noteDisabled = "disabled";
                    }

                    else if (b.isApproved === 2) {
                         rejectChecked = "checked";
                         approveDisabled = "disabled";
                         rejectDisabled = "disabled";
                         noteDisabled = "disabled";
                    }

                    rows += `
                    <tr data-status="${b.isApproved}" data-id="${b.id}">

                         <td>${b.name}</td>
                         <td>${b.email}</td>
                         <td>${b.phone}</td>
                         <td>${formatDate(b.date)}</td>
                         <td>${b.time}</td>
                         <td>${b.people}</td>
                         <td>${b.message}</td>

                         <td>
                              <input type="text" class="form-control note-input"
                                   placeholder="Enter note" ${noteDisabled}>
                         </td>

                         <td class="text-center">
                              <input type="checkbox" class="approveCheck"
                                   ${approveChecked} ${approveDisabled}>
                         </td>

                         <td class="text-center">
                              <input type="checkbox" class="rejectCheck"
                                   ${rejectChecked} ${rejectDisabled}>
                         </td>

                    </tr>
                    `;
               });

            $("#bookingBody").html(rows);

            initializeDataTable();

            filterBookings();
        })

        .catch(error => {
            console.error("Error loading bookings:", error);
        });

}


/* =========================
   DataTable Initialization
========================= */

function initializeDataTable() {

    if ($.fn && $.fn.DataTable) {

        if ($.fn.DataTable.isDataTable('#bookingTable')) {
            $('#bookingTable').DataTable().destroy();
        }

        $('#bookingTable').DataTable({
            paging: true,
            searching: true,
            ordering: true,
            pageLength: 10,

            dom:
                "<'row mb-3'<'col-md-6'l><'col-md-6 text-end'f>>" +
                "<'row'<'col-12'tr>>" +
                "<'row mt-3'<'col-md-6'i><'col-md-6 text-end'p>>"
        });

    }

}


/* =========================
   Format Date
========================= */

function formatDate(dateString) {

    let date = new Date(dateString);
    return date.toLocaleDateString();

}


/* =========================
   Filter Bookings
========================= */

function filterBookings() {

    let table = $('#bookingTable').DataTable();
    let selectedStatus = $("#statusFilter").val();

    table.draw();

    // reset select all checkboxes
    $("#selectApproveAll").prop("checked", false);
    $("#selectRejectAll").prop("checked", false);

    // disable select all for approved / rejected filters
    if (selectedStatus === "1" || selectedStatus === "2") {
        $("#selectApproveAll").prop("disabled", true);
        $("#selectRejectAll").prop("disabled", true);
    }
    else {
        $("#selectApproveAll").prop("disabled", false);
        $("#selectRejectAll").prop("disabled", false);
    }

    toggleSaveButton();
}