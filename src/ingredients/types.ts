import { FoodId } from 'foods'

type Ingredient = {
  foodId: FoodId
  amount: number
  portionId: string
  isHeader?: boolean
}

export type { Ingredient }
