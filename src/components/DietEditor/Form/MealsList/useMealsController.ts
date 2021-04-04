import { getMealForm, MealField, useMealsForms } from 'core/dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useFormContext } from 'react-hook-form'

type MealsController = {
  mealsFields: MealField[]
  onMealAdd: () => void
  onMealRemove: (index: number) => void
}

function useMealsController(): MealsController {
  const { control } = useFormContext()
  const { mealsFields, appendMealForm, removeMealForm } = useMealsForms({
    control,
  })
  const { saveLastChange } = useUndoRedoMethods()

  function onMealAdd() {
    const mealForm = getMealForm()
    appendMealForm(mealForm)
    saveLastChange()
  }

  function onMealRemove(index: number) {
    removeMealForm(index)
  }

  return {
    mealsFields,
    onMealAdd,
    onMealRemove,
  }
}

export type { MealsController }

export default useMealsController
