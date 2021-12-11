import { Ingredient } from 'ingredients'

type Meal = {
  name: string
  imageUrl?: string
  ingredients: Ingredient[]
}

export type { Meal }
