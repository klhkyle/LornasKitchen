import { fetchRecipes, fetchRecipeContent } from "./dataFetcher.js";
import { updateHeaderState } from "./utils.js";

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

    console.log("DOM elements retrieved:", {
        recipeListView,
        recipeDetailView,
        recipeTitle,
        ingredientsList,
        instructionsList,
        servingsInput,
    });

    recipeListView.style.display = "none";
    recipeDetailView.style.display = "block";
    window.isLandingPage = false;
    updateHeaderState();
    window.scrollTo(0, 0);

    console.log("View states updated");

    // Clear previous content
    ingredientsList.innerHTML = "";
    instructionsList.innerHTML = "";

    console.log("Previous content cleared");

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
                    recipeTitle.textContent = content.title;
                    servingsInput.value = content.servings || 1; // Default to 1 if servings is not specified

                    // Populate ingredients
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

                        ingredientsList.appendChild(li);
                    });

                    // Populate instructions
                    content.instructions.forEach((step) => {
                        const li = document.createElement("li");
                        li.textContent = step; // Remove the index and extra numbering
                        instructionsList.appendChild(li);
                    });

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
                    } else {
                        console.warn(
                            "Update servings button not found. Creating one..."
                        );
                        const servingsControl =
                            document.getElementById("servings-control");
                        if (servingsControl) {
                            const newButton = document.createElement("button");
                            newButton.id = "update-servings";
                            newButton.textContent = "Update";
                            newButton.addEventListener("click", function () {
                                updateServings(content.servings || 1);
                            });
                            servingsControl.appendChild(newButton);
                        } else {
                            console.error("Servings control element not found");
                        }
                    }

                    console.log("Recipe content rendered successfully");
                } catch (error) {
                    console.error("Error during rendering:", error);
                    // Fallback: display raw JSON data
                    recipeDetailView.innerHTML = `<pre>${JSON.stringify(
                        content,
                        null,
                        2
                    )}</pre>`;
                }
            } else {
                console.error("Recipe content is null or undefined");
                recipeDetailView.innerHTML = "<p>Recipe details not found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error rendering recipe:", error);
            recipeDetailView.innerHTML =
                "<p>An error occurred while loading the recipe.</p>";
        });

    console.log("Exiting showRecipeDetail function");
}

function updateServings(originalServings) {
    const servingsInput = document.getElementById("servings");
    const servingsUnit = document.getElementById("servings-unit");
    const newServings = parseInt(servingsInput.value);
    const ingredientsList = document.getElementById("ingredients-list");

    // Update servings unit based on recipe
    if (originalServings === 1) {
        servingsUnit.textContent = "cake"; // or 'house' for gingerbread house
    } else if (originalServings > 1) {
        servingsUnit.textContent = "dozen";
    } else {
        servingsUnit.textContent = ""; // For cases where servings might not be applicable
    }

    // Update ingredient amounts
    if (ingredientsList) {
        const factor = newServings / originalServings;
        const ingredients = ingredientsList.getElementsByTagName("li");

        for (let i = 0; i < ingredients.length; i++) {
            const ing = ingredients[i];
            const originalAmount = parseFloat(ing.dataset.amount);

            if (!isNaN(originalAmount)) {
                const unit = ing.dataset.unit || "";
                const newAmount = (originalAmount * factor).toFixed(2);
                const itemName = ing.textContent.split(" ").slice(-1)[0];
                ing.textContent = `${newAmount} ${unit} ${itemName}`.trim();
            }
            // If there's no amount, leave the ingredient as is
        }
    } else {
        console.error("Ingredients list not found");
    }
}
