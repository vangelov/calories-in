import {
  getIngredientForm,
  IngredientForm,
  getInsertIngredientAnimationKey,
} from 'core/dietForm'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'
import { useUndoRedoMethods } from 'core/undoRedo'
import { Food } from 'core/types'
import { IngredientsFieldArray } from './useIngredientsFieldArray'

type Params = {
  ingredientsFieldArray: IngredientsFieldArray
}

function useAddIngredients({ ingredientsFieldArray }: Params) {
  const { saveLastChange } = useUndoRedoMethods()
  const oneTimeCheck = useOneTimeCheck()

  function onAddIngredients(foods: Food[]) {
    const ingredientForms: IngredientForm[] = []

    for (const food of foods) {
      const ingredientForm = getIngredientForm({
        foodId: food.id,
        amountInGrams: 100,
      })

      oneTimeCheck.set(getInsertIngredientAnimationKey(ingredientForm.fieldId))
      ingredientForms.push(ingredientForm)
    }

    ingredientsFieldArray.appendIngredientForms(ingredientForms)

    saveLastChange()
  }

  return {
    onAddIngredients,
  }
}

export default useAddIngredients
