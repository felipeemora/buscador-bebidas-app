import { StateCreator } from "zustand";
import { getCategories, getRecipes } from "../services/RecipeService";
import { Category, Drinks } from "../types";
import { SearchFilter } from '../types/index';

export type RecipesSliceType = {
  categories: Category,
  drinks: Drinks
  fecthCategories: () => Promise<void>,
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>
} 

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: []
  },
  drinks: {
    drinks: []
  },
  fecthCategories: async() => {
    const categories = await getCategories();
    set({
      categories
    })
  },
  searchRecipes: async(searchFilters) => {
    const drinks = await getRecipes(searchFilters);
    set({
      drinks
    })
  }
})