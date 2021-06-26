import { IngredientForm } from './ingredientForm'
import { MealField } from '../meals/mealForm'
import { useDragAndDropResponder } from 'core/dndResponders'
import { useUndoRedoMethods } from 'core/undoRedo'
import { DropResult } from 'react-beautiful-dnd'
import { useIngredientsFormsDndState } from './IngredientsFormsDndProvider'
import { useLayoutEffect, useState } from 'react'
import { IngredientsFieldArray } from 'core/dietForm'

type Params = {
  mealField: MealField
  ingredientsFieldArray: IngredientsFieldArray
}

function useReorderIngredientsForms({
  mealField,
  ingredientsFieldArray,
}: Params) {
  const ingredientFormRef = useIngredientsFormsDndState()
  const { saveLastChange } = useUndoRedoMethods()
  const [pendingInsert, setPendingInsert] = useState<() => void>()

  useLayoutEffect(() => {
    if (pendingInsert) {
      pendingInsert()
    }
  }, [pendingInsert])

  useDragAndDropResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination || type !== 'ingredientsList') {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      mealField.fieldId === destination.droppableId
    ) {
      ingredientsFieldArray.moveIngredientForm(source.index, destination.index)
    } else if (destination.droppableId === mealField.fieldId) {
      let ingredientForm: IngredientForm | undefined = ingredientFormRef.current

      setPendingInsert(() => {
        if (ingredientForm) {
          ingredientsFieldArray.insertIngredientForm(
            destination.index,
            ingredientForm,
            {
              shouldFocus: false,
            }
          )
        }
      })
    } else if (source.droppableId === mealField.fieldId) {
      ingredientsFieldArray.removeIngredientForm(source.index)
    }

    saveLastChange()
  })
}

export default useReorderIngredientsForms
