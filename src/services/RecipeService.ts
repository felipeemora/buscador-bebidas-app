import axios from "axios";
import { parse } from "valibot";
import { CategoriesApiResponseSchema, DrinksApiResponse, RecipeAPIResponseSchema } from "../schema/recipes-schema";
import { Drink, SearchFilter } from "../types";

export async function getCategories() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { data } = await axios(url);
  const result = parse(CategoriesApiResponseSchema, data);
  console.log("🚀 ~ getCategories ~ result:", result)
  if (result) {
    return result;
  }
}

export async function getRecipes(filters:SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;
  const { data } = await axios(url);
  const result = parse(DrinksApiResponse, data);
  if (result) {
    return result;
  }
}

export async function getRecipeById(id: Drink['idDrink']) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios(url);
  const result = parse(RecipeAPIResponseSchema, data.drinks[0]);
  if (result){
    return result;
  }
}
