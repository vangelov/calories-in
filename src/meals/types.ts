import { Ingredient, IngredientsSeparator } from 'ingredients'

type Meal = {
  name: string
  imageUrl?: string
  ingredientsOrSeparators: (Ingredient | IngredientsSeparator)[]
  servings: number
}

export type { Meal }
