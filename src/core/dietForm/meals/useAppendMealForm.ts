import { getMealForm, getInsertMealFormAnimationKey } from './mealForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { MutableRefObject } from 'react'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'
import { MealsFieldArray } from './useMealsFieldArray'

type Params = {
  mealsFieldArray: MealsFieldArray
  pendingMealFieldIdRef: MutableRefObject<string | null>
}

function useAppendMealForm({ mealsFieldArray, pendingMealFieldIdRef }: Params) {
  const { saveLastChange } = useUndoRedoMethods()
  const oneTimeCheck = useOneTimeCheck()

  function onAppend() {
    const mealForm = getMealForm()
    oneTimeCheck.set(getInsertMealFormAnimationKey(mealForm.fieldId))

    pendingMealFieldIdRef.current = mealForm.fieldId
    mealsFieldArray.appendMealForm(mealForm)
    saveLastChange()
  }

  return {
    onAppend,
  }
}

export default useAppendMealForm
