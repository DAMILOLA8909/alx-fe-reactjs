import { create } from 'zustand';

// Zustand store for managing recipes, including search and filtering logic
export const useRecipeStore = create((set, get) => ({
  // Array to hold all recipes
  recipes: [],

  // Holds the current search term entered by the user
  searchTerm: '',

  // Holds the list of recipes filtered based on the search term
  filteredRecipes: [],

  // ✅ Adds a new recipe to the list
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: [...state.recipes, newRecipe], // keep filtered in sync
    })),

  // ✅ Deletes a recipe by its ID
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
      filteredRecipes: state.filteredRecipes.filter((r) => r.id !== id),
    })),

  // ✅ Updates a recipe (edit feature)
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
      filteredRecipes: state.filteredRecipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),

  // ✅ Updates the search term used for filtering
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); // automatically re-filter recipes whenever search changes
  },

  // ✅ Filters recipes based on the search term (case insensitive)
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // ✅ Sets all recipes (used for initialization)
  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),
}));
