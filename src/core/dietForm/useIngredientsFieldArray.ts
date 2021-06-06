import { MealField, getIngredientsFormsPath, IngredientField } from './dietForm'
import { useReorderIngredientsForms } from 'core/ingredientsDnd'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'

function useIngredientsFieldArray(mealIndex: number, mealField: MealField) {
  const {
    fields: ingredientsFields,
    insert: insertIngredientForm,
    append: appendIngredientForms,
    remove: removeIngredientForm,
    move: moveIngredientForm,
  } = useFieldArray({
    name: getIngredientsFormsPath(mealIndex),
  })

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
    ingredientsFields: ingredientsFields as IngredientField[],
    onIngredientRemove,
    insertIngredientForm,
    appendIngredientForms,
  }
}

type IngredientsFieldArray = ReturnType<typeof useIngredientsFieldArray>

export type { IngredientsFieldArray }

export default useIngredientsFieldArray
