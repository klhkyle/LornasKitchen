import { initializeEventListeners } from "./eventListeners.js";
import { showCategoryView } from "./views.js";
import { updateHeaderState } from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");
    initializeEventListeners();
    showCategoryView();
    updateHeaderState();

    // Set copyright year
    const currentYear = new Date().getFullYear();
    document.getElementById(
        "copyright"
    ).textContent = `© Lorna's Kitchen ${currentYear}`;
});
