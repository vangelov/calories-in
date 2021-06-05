import { getIngredientForm, IngredientForm } from 'core/dietForm'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'
import { useFoodsByIdDispatch } from 'core/foods'
import { useUndoRedoMethods } from 'core/undoRedo'
import { Food } from 'core/types'
import { IngredientsFieldArray } from './useIngredientsFieldArray'

type Params = {
  ingredientsFieldArray: IngredientsFieldArray
}

function useAddIngredietnts({ ingredientsFieldArray }: Params) {
  const foodsByIdDispatch = useFoodsByIdDispatch()
  const { saveLastChange } = useUndoRedoMethods()
  const oneTimeCheck = useOneTimeCheck()

  function onAddIngredients(foods: Food[]) {
    const ingredientForms: IngredientForm[] = []

    for (const food of foods) {
      foodsByIdDispatch({ type: 'addFood', food })

      const ingredientForm = getIngredientForm({
        foodId: food.id,
        amountInGrams: 100,
      })

      oneTimeCheck.set(`${ingredientForm.fieldId}test`)
      ingredientForms.push(ingredientForm)
    }

    ingredientsFieldArray.insertIngredientForm(
      ingredientsFieldArray.ingredientsFields.length,
      ingredientForms
    )

    saveLastChange()
  }

  return {
    onAddIngredients,
  }
}

export default useAddIngredietnts
