// toastHelper.js

/**
 * Initialize default options for jQuery Toast Plugin (optional)
 */
function initializeToasts() {
    if (typeof $.toast === 'function') {
        $.toastDefaults = {
            heading: '',
            text: '',
            showHideTransition: 'fade', // fade, slide, plain
            icon: 'info',               // info, success, warning, error
            loader: true,
            loaderBg: '#9EC600',
            position: 'bottom-right',
            hideAfter: 5000
        };
    } else {
        console.error("jQuery Toast Plugin is not loaded.");
    }
}

/**
 * Show a generic toast message
 * @param {string} message - The text to display
 * @param {string} heading - Optional title of the toast
 * @param {string} type - success, info, warning, error
 * @param {number} duration - Optional duration in ms
 */
function showToast(message, heading = '', type = 'info', duration = 5000) {
    if (typeof $.toast === 'function') {
        $.toast({
            heading: heading,
            text: message,
            icon: type,
            showHideTransition: 'slide',
            loader: true,
            loaderBg: type === 'success' ? '#9EC600' : (type === 'error' ? '#f2a654' : '#999'),
            position: 'bottom-right',
            hideAfter: duration
        });
    } else {
        console.error("jQuery Toast Plugin is not loaded.");
        alert(`${heading} - ${message}`); // fallback
    }
}

/**
 * Hide all toasts
 */
function hideAllToasts() {
    $('.jq-toast-wrap').remove();
}
