import { StateCreator } from "zustand";
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService";
import { Category, Drink, Drinks, Recipe } from "../types";
import { SearchFilter } from '../types/index';
import { FavoritestSliceType } from "./favoritesSlice";

export type RecipesSliceType = {
  categories: Category,
  drinks: Drinks,
  selectedRecipe: Recipe,
  modal: boolean,
  fecthCategories: () => Promise<void>,
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>
  selectRecipe: (id: Drink['idDrink']) => Promise<void>,
  closeModal: () => void
} 

export const createRecipesSlice: StateCreator<RecipesSliceType & FavoritestSliceType, [], [], RecipesSliceType> = (set) => ({
  categories: {
    drinks: []
  },
  drinks: {
    drinks: []
  },
  selectedRecipe: {} as Recipe,
  modal: false,
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
  },
  selectRecipe: async(id) => {
    const recipe = await getRecipeById(id);
    set({
      selectedRecipe: recipe,
      modal: true
    })
  },
  closeModal: () => {
    set({
      modal: false,
      selectedRecipe: {} as Recipe
    })
  }
})