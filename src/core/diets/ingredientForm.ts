import { Ingredient } from 'core/types'
import { v4 as uuidv4 } from 'uuid'

type IngredientForm = {
  fieldId: string
  foodId: number
  amountInGrams: string
}

function getIngredientForm(ingredient: Ingredient): IngredientForm {
  const fieldId = uuidv4()

  return {
    fieldId,
    foodId: ingredient.foodId,
    amountInGrams: ingredient.amountInGrams.toString(),
  }
}

function getInsertIngredientFormAnimationKey(fieldId: string) {
  return `insert-ingredient-animation-${fieldId}`
}

export type { IngredientForm }

export { getIngredientForm, getInsertIngredientFormAnimationKey }
