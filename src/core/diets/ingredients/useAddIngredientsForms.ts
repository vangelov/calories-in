import {
  getIngredientForm,
  IngredientForm,
  getInsertIngredientFormAnimationKey,
} from '../ingredients/ingredientForm'
import { useOneTimeCheck } from 'general/OneTimeCheckProvider'
import { useUndoRedoMethods } from 'general/undoRedo'
import { Food } from 'core/types'
import { IngredientsFieldArray } from './useIngredientsFieldArray'

type Params = {
  ingredientsFieldArray: IngredientsFieldArray
}

export const DEFAULT_AMOUNT_IN_GRAMS = 100

function useAddIngredientsForms({ ingredientsFieldArray }: Params) {
  const { saveLastChange } = useUndoRedoMethods()
  const oneTimeCheck = useOneTimeCheck()

  function onAddIngredients(foods: Food[]) {
    const ingredientForms: IngredientForm[] = []

    for (const food of foods) {
      const ingredientForm = getIngredientForm({
        foodId: food.id,
        amountInGrams: DEFAULT_AMOUNT_IN_GRAMS,
      })

      oneTimeCheck.set(
        getInsertIngredientFormAnimationKey(ingredientForm.fieldId)
      )
      ingredientForms.push(ingredientForm)
    }

    ingredientsFieldArray.appendIngredientForms(ingredientForms)

    saveLastChange()
  }

  return {
    onAddIngredients,
  }
}

export default useAddIngredientsForms
