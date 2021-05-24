import { useIngredientsForms, MealField } from 'core/dietForm'
import { useReorderIngredientsForms } from 'core/ingredientsDnd'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useEffect, useState } from 'react'

function useIngredientsController(mealIndex: number, mealField: MealField) {
  const {
    ingredientsFields,
    removeIngredientForm,
    insertIngredientForm,
    moveIngredientForm,
  } = useIngredientsForms(mealIndex)
  const [removeData, setRemoveData] = useState({ index: -1 })

  const { saveLastChange } = useUndoRedoMethods()

  useEffect(() => {
    const { index } = removeData

    if (index >= 0) {
      removeIngredientForm(index)
      saveLastChange()
    }
  }, [removeData, removeIngredientForm, saveLastChange])

  useReorderIngredientsForms({
    mealField,
    removeIngredientForm,
    insertIngredientForm,
    moveIngredientForm,
  })

  function onIngredientRemove(ingredientIndex: number) {
    /* Because of the animation this remove is done after a timeout but for 
       some reason react-hook-form stops working in this case. We force a 
       re-render and do the actual removal in the useEffect */

    setRemoveData({ index: ingredientIndex })
  }

  return {
    ingredientsFields,
    onIngredientRemove,
    insertIngredientForm,
  }
}

export default useIngredientsController
