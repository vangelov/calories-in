import { getMealForm, MealField, useMealsForms } from 'core/dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'

type MealsController = {
  mealsFields: MealField[]
  onMealAdd: () => void
  onMealRemove: (index: number) => void
}

function useMealsController(): MealsController {
  const { mealsFields, appendMealForm, removeMealForm } = useMealsForms()
  const { saveLastChange } = useUndoRedoMethods()

  function onMealAdd() {
    const mealForm = getMealForm()
    appendMealForm(mealForm, {
      shouldFocus: true,
      focusName: `mealsForms.${mealsFields.length}.name`,
    })
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
