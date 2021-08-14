import { NutritionData } from 'stats'

type Food = {
  id: number
  categoryId: number
  name: string
  addedByUser?: boolean
  servingSizeInGrams?: number
} & NutritionData

export type { Food }
