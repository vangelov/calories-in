import {
  getMealForm,
  getMealsFormsPath,
  MealField,
  getInsertMealFormAnimationKey,
} from './mealForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useFieldArray } from 'react-hook-form'
import { MutableRefObject } from 'react'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'

type Params = {
  variantIndex: number
  pendingMealFieldIdRef: MutableRefObject<string | null>
}

function useMealsFieldArray({ variantIndex, pendingMealFieldIdRef }: Params) {
  const {
    fields: mealsFields,
    append: appendMealForm,
    remove: removeMealForm,
    move: moveMealForm,
  } = useFieldArray({
    name: getMealsFormsPath(variantIndex),
  })
  const { saveLastChange } = useUndoRedoMethods()
  const oneTimeCheck = useOneTimeCheck()

  function onMealAdd() {
    const mealForm = getMealForm()
    oneTimeCheck.set(getInsertMealFormAnimationKey(mealForm.fieldId))

    pendingMealFieldIdRef.current = mealForm.fieldId
    appendMealForm(mealForm)
    saveLastChange()
  }

  return {
    mealsFields: mealsFields as MealField[],
    onMealAdd,
    removeMealForm,
    appendMealForm,
    moveMealForm,
  }
}

type MealsFieldArray = ReturnType<typeof useMealsFieldArray>

export type { MealsFieldArray }

export default useMealsFieldArray
