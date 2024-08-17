import { InferOutput } from "valibot";
import { CategoriesApiResponseSchema, DrinkApiResponse, DrinksApiResponse, SearchFilterSchema } from "../schema/recipes-schema";

export type Category = InferOutput<typeof CategoriesApiResponseSchema>;

export type SearchFilter = InferOutput<typeof SearchFilterSchema>;
export type Drinks = InferOutput<typeof DrinksApiResponse>;
export type Drink = InferOutput<typeof DrinkApiResponse>;
