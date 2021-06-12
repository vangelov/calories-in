import { getMealForm, getMealsFormsPath, MealField } from './dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useFieldArray } from 'react-hook-form'
import { useEffect, useState, MutableRefObject } from 'react'
import getInsertMealAnimationKey from './getInsertMealAnimationKey'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'

type Params = {
  pendingMealFieldIdRef: MutableRefObject<string | null>
}

function useMealsFieldArray({ pendingMealFieldIdRef }: Params) {
  const {
    fields: mealsFields,
    append: appendMealForm,
    remove: removeMealForm,
  } = useFieldArray({
    name: getMealsFormsPath(),
  })
  const [removeData, setRemoveData] = useState({ index: -1 })
  const { saveLastChange } = useUndoRedoMethods()
  const oneTimeCheck = useOneTimeCheck()

  useEffect(() => {
    const { index } = removeData

    if (index >= 0) {
      removeMealForm(index)
      saveLastChange()
    }
  }, [removeData, removeMealForm, saveLastChange])

  function onMealAdd() {
    const mealForm = getMealForm()
    oneTimeCheck.set(getInsertMealAnimationKey(mealForm.fieldId))

    pendingMealFieldIdRef.current = mealForm.fieldId
    appendMealForm(mealForm)
    saveLastChange()
  }

  function onMealRemove(index: number) {
    setRemoveData({ index })
  }

  return {
    mealsFields: mealsFields as MealField[],
    onMealAdd,
    onMealRemove,
  }
}

type MealsFieldArray = ReturnType<typeof useMealsFieldArray>

export type { MealsFieldArray }

export default useMealsFieldArray
