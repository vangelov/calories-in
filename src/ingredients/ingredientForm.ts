import { Ingredient } from './types'
import { v4 as uuidv4 } from 'uuid'
import { FoodId } from 'foods'
import { formatAmount } from 'portions'

type IngredientForm = {
  fieldId: string
  foodId: FoodId
  amount: string
  notes?: string
  portionId: string
}

function getIngredientForm(ingredient: Ingredient): IngredientForm {
  const fieldId = uuidv4()

  return {
    fieldId,
    foodId: ingredient.foodId,
    amount: formatAmount(ingredient.amount, ingredient.portionId),
    portionId: ingredient.portionId,
  }
}

function getInsertIngredientFormAnimationKey(fieldId: string) {
  return `insert-ingredient-animation-${fieldId}`
}

export type { IngredientForm }

export { getIngredientForm, getInsertIngredientFormAnimationKey }
