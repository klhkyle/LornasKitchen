const breadsRecipes = {
    buns: {
        title: "Buns",
        servings: 24,
        ingredients: [
            { item: "all-purpose flour", amount: 2.25, unit: "cups" },
            { item: "baking soda", amount: 1, unit: "tsp" },
            { item: "salt", amount: 1, unit: "tsp" },
            { item: "unsalted butter, softened", amount: 1, unit: "cup" },
            { item: "granulated sugar", amount: 0.75, unit: "cup" },
            { item: "brown sugar", amount: 0.75, unit: "cup" },
            { item: "vanilla extract", amount: 1, unit: "tsp" },
            { item: "large eggs", amount: 2, unit: null },
            { item: "semisweet chocolate chips", amount: 2, unit: "cups" },
        ],
        instructions: [
            "Preheat oven to 375°F (190°C).",
            "In a small bowl, whisk together the flour, baking soda, and salt.",
            "In a large bowl, cream together the butter, granulated sugar, brown sugar, and vanilla extract until smooth.",
            "Beat in the eggs one at a time.",
            "Gradually blend in the flour mixture.",
            "Stir in the chocolate chips.",
            "Drop by rounded tablespoons onto ungreased baking sheets.",
            "Bake for 9 to 11 minutes or until golden brown.",
            "Let stand for 2 minutes before removing to cool on wire racks.",
        ],
    },
    // Add more cookie recipes here...
};

export default breadsRecipes;
