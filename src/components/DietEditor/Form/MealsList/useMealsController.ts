import { getMealForm, MealField, useMealsForms } from 'core/dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { MutableRefObject } from 'react'

type Params = {
  pendingMealFieldIdRef: MutableRefObject<string | null>
}

type MealsController = {
  mealsFields: MealField[]
  onMealAdd: () => void
  onMealRemove: (index: number) => void
}

function useMealsController({
  pendingMealFieldIdRef,
}: Params): MealsController {
  const { mealsFields, appendMealForm, removeMealForm } = useMealsForms()
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
    mealsFields,
    onMealAdd,
    onMealRemove,
  }
}

export type { MealsController }

export default useMealsController
