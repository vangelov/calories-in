import { Ingredient } from 'ingredients'

type Meal = {
  id?: number
  name: string
  categoryId?: number
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  ingredients: Ingredient[]
}

export type { Meal }
