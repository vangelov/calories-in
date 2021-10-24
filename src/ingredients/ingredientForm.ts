import { Ingredient } from './types'
import { v4 as uuidv4 } from 'uuid'
import { FoodId } from 'foods'

type IngredientForm = {
  fieldId: string
  foodId: FoodId
  amount: string
  notes?: string
}

function getIngredientForm(ingredient: Ingredient): IngredientForm {
  const fieldId = uuidv4()

  return {
    fieldId,
    foodId: ingredient.foodId,
    amount: ingredient.amount.toString(),
  }
}

function getInsertIngredientFormAnimationKey(fieldId: string) {
  return `insert-ingredient-animation-${fieldId}`
}

export type { IngredientForm }

export { getIngredientForm, getInsertIngredientFormAnimationKey }
