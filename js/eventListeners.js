import { showCategoryView, showRecipeList, showRecipeDetail } from "./views.js";
import { updateHeaderState } from "./utils.js";

export function initializeEventListeners() {
    const searchIcon = document.querySelector(".search-icon");
    const searchField = document.querySelector(".search-field");
    const closeSearch = document.querySelector(".close-search");
    const searchInput = document.querySelector(".search-input");
    const logo = document.getElementById("logo");
    const backToCategories = document.getElementById("back-to-categories");
    const backToRecipes = document.getElementById("back-to-recipes");

    // Search functionality
    searchIcon.addEventListener("click", function () {
        searchIcon.classList.add("hidden");
        searchField.classList.add("active");
        searchInput.focus();
    });

    closeSearch.addEventListener("click", function () {
        searchIcon.classList.remove("hidden");
        searchField.classList.remove("active");
        searchInput.value = "";
    });

    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            alert(`Searching for: ${this.value}`);
            // Implement actual search functionality here
        }
    });

    // Logo click functionality
    logo.addEventListener("click", showCategoryView);

    // Category selection
    document.querySelectorAll(".category-button").forEach((button) => {
        button.addEventListener("click", function () {
            const category = this.textContent
                .trim()
                .toLowerCase()
                .replace(/\s+/g, " ");
            console.log("Category clicked:", category);
            showRecipeList(category);
        });
    });

    // Back button functionality
    backToCategories.addEventListener("click", showCategoryView);
    backToRecipes.addEventListener("click", () => {
        document.getElementById("recipe-detail-view").style.display = "none";
        document.getElementById("recipe-list-view").style.display = "block";
        updateHeaderState();
    });

    // Header animation
    window.addEventListener("scroll", updateHeaderState);
}
