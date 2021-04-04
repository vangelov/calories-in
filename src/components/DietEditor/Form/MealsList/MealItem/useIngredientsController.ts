import { useIngredientsForms, MealField } from 'core/dietForm'
import { useReorderIngredientsForms } from 'core/foodsDnd'
import { useUndoRedoMethods } from 'core/undoRedo'

function useIngredientsController(mealIndex: number, mealField: MealField) {
  const {
    ingredientsFields,
    removeIngredientForm,
    insertIngredientForm,
    moveIngredientForm,
  } = useIngredientsForms(mealIndex)

  const { saveLastChange } = useUndoRedoMethods()

  useReorderIngredientsForms({
    mealField,
    removeIngredientForm,
    insertIngredientForm,
    moveIngredientForm,
  })

  function onIngredientRemove(ingredientIndex: number) {
    removeIngredientForm(ingredientIndex)
    saveLastChange()
  }

  return {
    ingredientsFields,
    onIngredientRemove,
  }
}

export default useIngredientsController
