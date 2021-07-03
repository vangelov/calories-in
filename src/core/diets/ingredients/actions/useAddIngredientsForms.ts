import {
  getIngredientForm,
  getInsertIngredientFormAnimationKey,
} from '../ingredientForm'
import { useOneTimeCheck } from 'general/oneTimeCheck'
import { useFormChangesStoreMethods } from 'general/undoRedo'
import { Food } from 'core/types'
import { IngredientsFieldArray } from '../useIngredientsFieldArray'

type Params = {
  ingredientsFieldArray: IngredientsFieldArray
}

export const DEFAULT_AMOUNT_IN_GRAMS = 100

function useAddIngredientsForms({ ingredientsFieldArray }: Params) {
  const { saveLastChange } = useFormChangesStoreMethods()
  const oneTimeCheck = useOneTimeCheck()

  function onAdd(foods: Food[]) {
    const ingredientForms = foods.map(({ id }) =>
      getIngredientForm({
        foodId: id,
        amountInGrams: DEFAULT_AMOUNT_IN_GRAMS,
      })
    )

    ingredientForms.forEach(({ fieldId }) => {
      oneTimeCheck.set(getInsertIngredientFormAnimationKey(fieldId))
    })

    ingredientsFieldArray.appendIngredientForms(ingredientForms)
    saveLastChange()
  }

  return {
    onAdd,
  }
}

export default useAddIngredientsForms
