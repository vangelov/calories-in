import { Ingredient } from 'core/types'
import { useFieldArray } from 'react-hook-form'
import { getMealsFormsPath } from './mealForm'
import { getFormPath } from './utils'
import { v4 as uuidv4 } from 'uuid'

type IngredientForm = {
  fieldId: string
  foodId: number
  amountInGrams: string
}

function getIngredientForm(ingredient: Ingredient): IngredientForm {
  const fieldId = uuidv4()

  const r = {
    fieldId,
    foodId: ingredient.foodId,
    amountInGrams: ingredient.amountInGrams.toString(),
  }

  Object.defineProperty(r, 'prop', { value: 2, enumerable: false })

  return r
}

type IngredientField = Partial<IngredientForm>

function useIngredientsForms(mealIndex: number) {
  const {
    fields: ingredientsFields,
    insert: insertIngredientForm,
    remove: removeIngredientForm,
    move: moveIngredientForm,
  } = useFieldArray({
    name: getIngredientsFormsPath(mealIndex),
  })

  return {
    ingredientsFields: ingredientsFields as IngredientField[],
    insertIngredientForm,
    removeIngredientForm,
    moveIngredientForm,
  }
}
function getIngredientsFormsPath(
  mealIndex: number,
  index?: number,
  fieldName?: string
): string {
  const mealsFormsPath = getMealsFormsPath(mealIndex, 'ingredientsForms')
  return getFormPath(mealsFormsPath, index, fieldName)
}

export type { IngredientForm, IngredientField }

export { getIngredientForm, useIngredientsForms, getIngredientsFormsPath }
