import { Ingredient } from 'ingredients'

type Recipe = {
  id: number
  name: string
  categoryId: number
  energy: number
  protein: number
  carbs: number
  fat: number
  imageUrl: string
  ingredients: Ingredient[]
}

export type { Recipe }
