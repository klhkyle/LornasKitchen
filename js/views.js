import { fetchRecipes, fetchRecipeContent } from "./dataFetcher.js";
import {
    updateHeaderState,
    formatQuantity,
    parseComplexAmount,
} from "./utils.js";

export function showCategoryView() {
    document.getElementById("category-view").style.display = "grid";
    document.getElementById("recipe-list-view").style.display = "none";
    document.getElementById("recipe-detail-view").style.display = "none";
    window.isLandingPage = true;
    updateHeaderState();
    window.scrollTo(0, 0);
}

export function showRecipeList(category) {
    console.log("Showing recipe list for category:", category);

    const categoryView = document.getElementById("category-view");
    const recipeListView = document.getElementById("recipe-list-view");
    const recipeDetailView = document.getElementById("recipe-detail-view");
    const categoryTitle = document.getElementById("category-title");
    const recipeList = document.getElementById("recipe-list");

    categoryView.style.display = "none";
    recipeListView.style.display = "block";
    recipeDetailView.style.display = "none";
    categoryTitle.textContent =
        category.charAt(0).toUpperCase() + category.slice(1);
    window.isLandingPage = false;
    updateHeaderState();
    window.scrollTo(0, 0);

    // Clear previous recipe list
    recipeList.innerHTML = "";

    // Fetch recipes for the selected category
    fetchRecipes(category).then((recipes) => {
        console.log("Fetched recipes:", recipes);
        recipes.forEach((recipe) => {
            const li = document.createElement("li");
            li.textContent = recipe.title;
            li.addEventListener("click", () => showRecipeDetail(recipe));
            recipeList.appendChild(li);
        });
    });
}

export function showRecipeDetail(recipe) {
    console.log("Entering showRecipeDetail function with recipe:", recipe);

    const recipeListView = document.getElementById("recipe-list-view");
    const recipeDetailView = document.getElementById("recipe-detail-view");
    const recipeTitle = document.getElementById("recipe-title");
    const ingredientsList = document.getElementById("ingredients-list");
    const instructionsList = document.getElementById("instructions-list");
    const servingsInput = document.getElementById("servings");

    // Check if all required elements are present
    if (!recipeDetailView) {
        console.error("recipe-detail-view not found");
        return;
    }

    console.log("DOM elements retrieved:", {
        recipeListView,
        recipeDetailView,
        recipeTitle,
        ingredientsList,
        instructionsList,
        servingsInput,
    });

    if (recipeListView) recipeListView.style.display = "none";
    recipeDetailView.style.display = "block";
    window.isLandingPage = false;
    updateHeaderState();
    window.scrollTo(0, 0);

    console.log("View states updated");

    // Clear previous content
    recipeDetailView.innerHTML = `
        <h2 id="recipe-title"></h2>
        <div id="servings-control">
            <label for="servings">Servings:</label>
            <input type="number" id="servings" min="1" value="1">
            <span id="servings-unit"></span>
            <button id="update-servings">Update</button>
        </div>
        <h3>Ingredients:</h3>
        <ul id="ingredients-list"></ul>
        <h3>Instructions:</h3>
        <ol id="instructions-list"></ol>
    `;

    // Re-fetch elements after clearing content
    const updatedRecipeTitle = document.getElementById("recipe-title");
    const updatedIngredientsList = document.getElementById("ingredients-list");
    const updatedInstructionsList =
        document.getElementById("instructions-list");
    const updatedServingsInput = document.getElementById("servings");
    const servingsUnit = document.getElementById("servings-unit");

    console.log("Previous content cleared and elements re-fetched");

    // Generate filename consistently with fetchRecipes in dataFetcher.js
    const filename = recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
    console.log("Generated filename:", filename);

    // Fetch and display recipe content
    console.log("Fetching recipe content...");
    fetchRecipeContent(filename)
        .then((content) => {
            console.log("Fetched recipe content:", content);
            if (content) {
                console.log("Rendering recipe content...");
                try {
                    if (updatedRecipeTitle)
                        updatedRecipeTitle.textContent = content.title;
                    if (updatedServingsInput)
                        updatedServingsInput.value = content.servings || 1;

                    // Initialize servings unit
                    if (servingsUnit) {
                        if (content.servings === 1) {
                            servingsUnit.textContent = " cake";
                        } else if (content.servings > 1) {
                            servingsUnit.textContent = " Dozen";
                        } else {
                            servingsUnit.textContent = "";
                        }
                    }

                    // Populate ingredients
                    if (updatedIngredientsList) {
                        content.ingredients.forEach((ing) => {
                            const li = document.createElement("li");
                            let ingredientText = "";

                            if (ing.amount) {
                                ingredientText += ing.amount + " ";
                            }
                            if (ing.unit) {
                                ingredientText += ing.unit + " ";
                            }
                            ingredientText += ing.item;

                            li.textContent = ingredientText.trim();

                            // Store original values as data attributes
                            if (ing.amount) li.dataset.amount = ing.amount;
                            if (ing.unit) li.dataset.unit = ing.unit;

                            updatedIngredientsList.appendChild(li);
                        });
                    }

                    // Populate instructions
                    if (updatedInstructionsList) {
                        content.instructions.forEach((step) => {
                            const li = document.createElement("li");
                            li.textContent = step;
                            updatedInstructionsList.appendChild(li);
                        });
                    }

                    // Add event listener for serving size update
                    const updateServingsButton =
                        document.getElementById("update-servings");
                    if (updateServingsButton) {
                        updateServingsButton.addEventListener(
                            "click",
                            function () {
                                updateServings(content.servings || 1);
                            }
                        );
                    }

                    console.log("Recipe content rendered successfully");
                } catch (error) {
                    console.error("Error during rendering:", error);
                    recipeDetailView.innerHTML = `<p>An error occurred while rendering the recipe: ${error.message}</p>`;
                }
            } else {
                console.error("Recipe content is null or undefined");
                recipeDetailView.innerHTML = "<p>Recipe details not found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching recipe:", error);
            recipeDetailView.innerHTML = `<p>An error occurred while loading the recipe: ${error.message}</p>`;
        });

    console.log("Exiting showRecipeDetail function");
}

function updateServings(originalServings) {
    const servingsInput = document.getElementById("servings");
    const servingsUnit = document.getElementById("servings-unit");
    const newServings = parseInt(servingsInput.value);
    const ingredientsList = document.getElementById("ingredients-list");

    // Update servings unit based on recipe
    if (newServings === 1) {
        servingsUnit.textContent = " Dozen"; // or ' house' for gingerbread house
    } else if (newServings > 1) {
        servingsUnit.textContent = " Dozen";
    } else {
        servingsUnit.textContent = ""; // For cases where servings might not be applicable
    }

    // Update ingredient amounts
    if (ingredientsList) {
        const factor = newServings / originalServings;
        const ingredients = ingredientsList.getElementsByTagName("li");

        for (let i = 0; i < ingredients.length; i++) {
            const ing = ingredients[i];
            const originalAmount = ing.dataset.amount;
            const originalUnit = ing.dataset.unit || "";
            const originalItem =
                ing.dataset.item ||
                ing.textContent
                    .replace(`${originalAmount} ${originalUnit}`, "")
                    .trim();

            // Store original data if not already stored
            if (!ing.dataset.item) {
                ing.dataset.item = originalItem;
            }

            if (originalAmount) {
                let newAmount;

                // Parse the original amount
                const parsedAmount = parseComplexAmount(originalAmount);
                newAmount = formatQuantity(parsedAmount * factor);

                // Reconstruct the ingredient text, replacing the entire content
                ing.textContent =
                    `${newAmount} ${originalUnit} ${originalItem}`.trim();
            }
            // If there's no amount, leave the ingredient as is
        }
    } else {
        console.error("Ingredients list not found");
    }
}
