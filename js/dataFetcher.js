import { recipeCategories } from "./recipeDatabase.js";

export async function fetchRecipes(category) {
    console.log("Fetching recipes for category:", category);
    const recipes = recipeCategories[category];
    if (!recipes) {
        console.error("No recipes found for category:", category);
        return [];
    }
    return recipes.map((title) => ({
        title: title,
        filename: title.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
    }));
}

export async function fetchRecipeContent(filename) {
    console.log("Fetching content for recipe:", filename);

    // Function to try loading a recipe from a specific category
    async function tryLoadingFromCategory(category) {
        try {
            console.log(
                `Attempting to import from ./recipeDetails/${category}.js`
            );
            const module = await import(`./recipeDetails/${category}.js`);
            const recipes = module.default;
            return recipes[filename] || null;
        } catch (error) {
            console.error(`Error loading ${category}.js:`, error);
            return null;
        }
    }

    // If the recipe is in favourites, we need to search all categories
    const isFavourite = recipeCategories.favourites.some(
        (recipe) =>
            recipe.toLowerCase().replace(/[^a-z0-9]+/g, "_") === filename
    );

    if (isFavourite) {
        console.log("Recipe is a favourite. Searching all categories.");
        for (let category of Object.keys(recipeCategories)) {
            if (category !== "favourites") {
                const recipe = await tryLoadingFromCategory(category);
                if (recipe) {
                    console.log(`Found recipe in category: ${category}`);
                    return recipe;
                }
            }
        }
        console.error("Favourite recipe not found in any category:", filename);
        return null;
    } else {
        // If not a favourite, find the category and load directly
        const category = Object.keys(recipeCategories).find(
            (cat) =>
                cat !== "favourites" &&
                recipeCategories[cat].some(
                    (recipe) =>
                        recipe.toLowerCase().replace(/[^a-z0-9]+/g, "_") ===
                        filename
                )
        );

        if (!category) {
            console.error("No category found for recipe:", filename);
            return null;
        }

        console.log("Category found:", category);
        return await tryLoadingFromCategory(category);
    }
}
