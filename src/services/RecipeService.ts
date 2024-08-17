import axios from "axios";
import { parse } from "valibot";
import { CategoriesApiResponseSchema, DrinksApiResponse } from "../schema/recipes-schema";
import { SearchFilter } from "../types";

export async function getCategories() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { data } = await axios(url);
  const result = parse(CategoriesApiResponseSchema, data);
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