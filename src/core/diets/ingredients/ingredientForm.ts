import { Ingredient } from 'core/types'
import { getMealsFormsPath } from '../meals/mealForm'
import { getFormPath } from '../utils'
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

type IngredientField = Partial<IngredientForm>

function getIngredientsFormsPath(
  variantIndex: number,
  mealIndex: number,
  index?: number,
  fieldName?: string
): string {
  const mealsFormsPath = getMealsFormsPath(
    variantIndex,
    mealIndex,
    'ingredientsForms'
  )
  return getFormPath(mealsFormsPath, index, fieldName)
}

function getInsertIngredientFormAnimationKey(fieldId: string) {
  return `insert-ingredient-animation-${fieldId}`
}

export type { IngredientForm, IngredientField }

export {
  getIngredientForm,
  getIngredientsFormsPath,
  getInsertIngredientFormAnimationKey,
}
