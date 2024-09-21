const breadRecipes = {
    banana_bread: {
        title: "Banana Bread",
        servings: 2, // 2 loaves
        ingredients: [
            { item: "large bananas", amount: 5 },
            { item: "eggs, well beaten", amount: 4 },
            { item: "shortening", amount: 1, unit: "cup" },
            { item: "white sugar", amount: 1, unit: "cup" },
            { item: "brown sugar", amount: 1, unit: "cup" },
            { item: "walnuts or chocolate chips", amount: 1, unit: "cup" },
            { item: "flour, sifted", amount: 3, unit: "cups" },
            { item: "baking soda", amount: 2, unit: "tsp" },
            { item: "salt", amount: 1, unit: "tsp" },
        ],
        instructions: [
            "Beat bananas to liquid, add eggs.",
            "Cream together shortening and sugar.",
            "Add banana-egg mixture.",
            "Sift together sifted flour, soda, and salt.",
            "Add walnuts or chocolate chips.",
            "Pour into well-greased loaf pans.",
            "Bake at 250°F for 1 1/2 hours.",
        ],
    },
    buns: {
        title: "Buns",
        servings: 1, // Servings not specified in original recipe
        ingredients: [
            { item: "flour", amount: 5, unit: "cups" },
            { item: "eggs", amount: 5 },
            { item: "oil", amount: "1/2", unit: "cup" },
            { item: "salt", amount: 1, unit: "tbsp" },
            { item: "warm water", amount: 2, unit: "cups" },
            { item: "sugar", amount: "1/2", unit: "cup" },
            { item: "yeast", amount: 2, unit: "tbsp" },
            { item: "additional flour", amount: "5-10", unit: "cups" },
        ],
        instructions: [
            "Mix the first 5 ingredients together.",
            "Add sugar and warm water on top of the mixture.",
            "Sprinkle yeast on top and stir softly so that the yeast is moistened.",
            "Let rise for 10 minutes.",
            "Add more flour (5-10 cups) until it is a soft dough.",
            "Put 1 tbsp oil in a large bowl.",
            "Put the dough in the bowl, knead it, and turn it over so that the top is covered in oil.",
            "Let rise until double.",
            "Form into rolls.",
            "Bake at 350°F until golden brown.",
        ],
    },
    pancakes: {
        title: "Pancakes",
        servings: 1, // Servings not specified in original recipe
        ingredients: [
            { item: "eggs", amount: 5 },
            { item: "all-purpose flour", amount: "2 1/2", unit: "cups" },
            { item: "whole wheat flour", amount: "1/2", unit: "cup" },
            { item: "baking powder", amount: 4, unit: "tbsp" },
            { item: "sugar", amount: 4, unit: "tbsp" },
            { item: "oil", amount: 6, unit: "tbsp" },
        ],
        instructions: [
            "Mix all ingredients together.",
            "Cook on a griddle or pan.",
        ],
    },
    pancake_syrup: {
        title: "Pancake Syrup",
        servings: 1, // Servings not specified in original recipe
        ingredients: [
            { item: "brown sugar", amount: 4, unit: "cups" },
            { item: "water", amount: 2, unit: "cups" },
        ],
        instructions: ["Combine brown sugar and water.", "Bring to a boil."],
    },
    zucchini_bread: {
        title: "Zucchini Bread",
        servings: 2, // 2 loaves or 1 bundt cake
        ingredients: [
            { item: "eggs", amount: 3 },
            { item: "sugar", amount: 2, unit: "cups" },
            { item: "oil", amount: 1, unit: "cup" },
            { item: "shredded zucchini", amount: 2, unit: "cups" },
            { item: "well drained pineapple", amount: "1/2", unit: "cup" },
            { item: "flour", amount: 3, unit: "cups" },
            { item: "salt", amount: 1, unit: "tsp" },
            { item: "cinnamon", amount: "1 1/2", unit: "tsp" },
            { item: "baking soda", amount: 2, unit: "tsp" },
            { item: "baking powder", amount: "1/2", unit: "tsp" },
            { item: "nutmeg", amount: "3/4", unit: "tsp" },
        ],
        instructions: [
            "Beat eggs, sugar, and oil until thick and foamy.",
            "Spoon in shredded zucchini and pineapple.",
            "Mix in dry ingredients.",
            "Pour into bundt pan or 2 loaf pans.",
            "Bake at 350°F for 1 hour.",
        ],
    },
    orange_glaze: {
        title: "Orange Glaze",
        servings: 1, // For zucchini bread
        ingredients: [
            { item: "powdered sugar", amount: 2, unit: "cups" },
            { item: "heated milk", amount: 3, unit: "tsp" },
            { item: "vanilla", amount: 1, unit: "tsp" },
            { item: "orange extract", amount: "1/2", unit: "tsp" },
        ],
        instructions: [
            "Mix all ingredients together until smooth.",
            "Drizzle over cooled zucchini bread.",
        ],
    },
    muesli_bread: {
        title: "Muesli Bread",
        servings: 4, // 4 loaves
        ingredients: [
            { item: "water", amount: 5, unit: "cups" },
            { item: "honey", amount: "1/2", unit: "cup" },
            { item: "yeast", amount: 4, unit: "tbsp" },
            { item: "whole wheat flour", amount: 3, unit: "cups" },
            { item: "wheat germ (optional)", amount: "1/2", unit: "cup" },
            { item: "oatmeal", amount: 2, unit: "cups" },
            { item: "raisins", amount: "1 1/2", unit: "cups" },
            { item: "oil", amount: "1/2", unit: "cup" },
            { item: "sunflower seeds", amount: "1/2", unit: "cup" },
            { item: "millet", amount: 4, unit: "tbsp" },
            { item: "sesame seeds", amount: 4, unit: "tbsp" },
            { item: "poppy seeds", amount: 4, unit: "tbsp" },
            { item: "flax seeds", amount: 4, unit: "tbsp" },
            { item: "molasses", amount: 2, unit: "tbsp" },
            { item: "salt", amount: 2, unit: "tbsp" },
            { item: "all-purpose flour", amount: "7-8", unit: "cups" },
        ],
        instructions: [
            "Mix all ingredients together.",
            "Knead for 7-10 minutes.",
            "Let rise for 1 1/2 to 2 hours.",
            "Put in pans and let rise for 1 hour.",
            "For topping, brush with 1 egg mixed with 2 tbsp milk.",
            "Sprinkle with seeds.",
            "Bake at 350°F for 30-35 minutes.",
        ],
    },
    nauvoo_bread: {
        title: "Nauvoo Bread",
        servings: 4, // 4 loaves (approximate)
        ingredients: [
            { item: "hot water", amount: 5, unit: "cups" },
            { item: "potato flakes", amount: "1/2", unit: "cup" },
            { item: "sugar", amount: "1/2", unit: "cup" },
            { item: "powdered milk", amount: 1, unit: "cup" },
            { item: "salt", amount: 2, unit: "tbsp" },
            { item: "oil or shortening", amount: "1/2", unit: "cup" },
            { item: "yeast", amount: 2, unit: "tbsp" },
            { item: "flour", amount: "10-14", unit: "cups" },
        ],
        instructions: [
            "Combine hot water, shortening, potato flakes, powdered milk, and sugar.",
            "Stir to dissolve shortening.",
            "When temperature is tepid, add yeast.",
            "Mix in 5 cups flour and the salt.",
            "Stir to a smooth sponge and elastic dough.",
            "Let rise until double, about 45 minutes.",
            "Punch down and let rise again.",
            "Shape into loaves, let rise.",
            "Bake at 375°F for 35 minutes.",
        ],
    },
};

export default breadRecipes;
