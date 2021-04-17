import { Ingredient } from 'core/types'
import { ArrayField, useFieldArray, useFormContext } from 'react-hook-form'
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

  return {
    fieldId,
    foodId: ingredient.foodId,
    amountInGrams: ingredient.amountInGrams.toString(),
  }
}

type IngredientField = Partial<ArrayField<IngredientForm, 'id'>>

function useIngredientsForms(mealIndex: number) {
  const { control } = useFormContext()

  const {
    fields: ingredientsFields,
    insert: insertIngredientForm,
    remove: removeIngredientForm,
    move: moveIngredientForm,
  } = useFieldArray<IngredientForm>({
    control,
    name: getIngredinetsFormsPath(mealIndex),
  })

  return {
    ingredientsFields,
    insertIngredientForm,
    removeIngredientForm,
    moveIngredientForm,
  }
}
function getIngredinetsFormsPath(
  mealIndex: number,
  index?: number,
  fieldName?: string
): string {
  const mealsFormsPath = getMealsFormsPath(mealIndex, 'ingredientsForms')
  return getFormPath(mealsFormsPath, index, fieldName)
}

export type { IngredientForm, IngredientField }

export { getIngredientForm, useIngredientsForms, getIngredinetsFormsPath }
