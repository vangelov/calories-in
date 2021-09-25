import { NutritionData } from 'stats'

type FoodId = string | number

type Food = {
  id: FoodId
  categoryId: number
  name: string
  addedByUser?: boolean
  servingSizeInGrams?: number
} & NutritionData

export type { Food, FoodId }
