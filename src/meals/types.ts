import { Ingredient } from 'ingredients'

type Meal = {
  name: string
  imageUrl?: string
  ingredients: Ingredient[]
  servings: number
}

export type { Meal }
