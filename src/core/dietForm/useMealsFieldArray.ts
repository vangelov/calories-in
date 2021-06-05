import { getMealForm, getMealsFormsPath, MealField } from './dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { MutableRefObject } from 'react'
import { useFieldArray } from 'react-hook-form'

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

  const { saveLastChange } = useUndoRedoMethods()

  function onMealAdd() {
    const mealForm = getMealForm()
    pendingMealFieldIdRef.current = mealForm.fieldId
    appendMealForm(mealForm)
    saveLastChange()
  }

  function onMealRemove(index: number) {
    removeMealForm(index)
    saveLastChange()
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
