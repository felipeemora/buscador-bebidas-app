import { array, object, string } from "valibot";

export const CategoriesApiResponseSchema = object({
  drinks: array(
    object({
      strCategory: string()
    })
  )
});

export const SearchFilterSchema = object({
  ingredient: string(),
  category: string()
})

export const DrinkApiResponse = object({
  idDrink: string(),
  strDrink: string(),
  strDrinkThumb: string(),
})

export const DrinksApiResponse = object({
  drinks: array(DrinkApiResponse)
})
