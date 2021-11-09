import { NutritionData } from 'stats'

type FoodId = string | number

type FoodVolume = {
  portionId: string
  weightInGrams: number
}

type Food = {
  id: FoodId
  categoryId: number
  name: string
  addedByUser?: boolean
  servingSizeInGrams?: number
  volume?: FoodVolume
  url?: string
} & NutritionData

export type { Food, FoodId, FoodVolume }
