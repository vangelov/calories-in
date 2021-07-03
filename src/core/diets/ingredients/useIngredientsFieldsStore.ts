import {
  getIngredientsFormsPath,
  IngredientField,
  IngredientForm,
} from './ingredientForm'
import { useFieldArray } from 'react-hook-form'
import tuple from 'general/tuple'
import { useCallback, useMemo } from 'react'
/*
import {
  getIngredientForm,
  getInsertIngredientFormAnimationKey,
} from './ingredientForm'
import { useOneTimeCheck } from 'general/oneTimeCheck'
import { useFormChangesStoreMethods } from 'general/undoRedo'
import { Food } from 'core/types'

type Params = {
  variantIndex: number
  mealIndex: number
  oneTimeCheckStore: 
}

function useIngredientsFieldsStore({ variantIndex, mealIndex }: Params) {
  const { fields, insert, append, remove, move } = useFieldArray({
    name: getIngredientsFormsPath(variantIndex, mealIndex),
  })

  const ingredientsFields = fields as IngredientField[]


  const addIngredients = useCallback((foods: Food[]) => {
    const ingredientForms = foods.map(({ id }) =>
      getIngredientForm({
        foodId: id,
        amountInGrams: DEFAULT_AMOUNT_IN_GRAMS,
      })
    )

    ingredientForms.forEach(({ fieldId }) => {
      oneTimeCheck.set(getInsertIngredientFormAnimationKey(fieldId))
    })

    append(ingredientForms)
    undoRedoSsaveLastChange()
  }, [])

  const methods = useMemo(
    () => ({
      insert,
      append,
      remove,
      move,
    }),
    [insert, append, remove, move]
  )

  return tuple(ingredientsFields, methods)
}

type IngredientsFieldsStore = ReturnType<typeof useIngredientsFieldsStore>

export type { IngredientsFieldsStore }

export default useIngredientsFieldsStore
*/
