import { IngredientForm, MealField } from 'core/dietForm'
import { useDragAndDropResponder } from 'core/dndResponders'
import { useUndoRedoMethods } from 'core/undoRedo'
import { DropResult } from 'react-beautiful-dnd'
import { useIngredientsFormsDndState } from './IngredientsFormsDndProvider'
import { FieldArrayMethodProps } from 'react-hook-form'
import { useLayoutEffect, useState } from 'react'

type Params = {
  mealField: MealField
  moveIngredientForm: (from: number, to: number) => void
  insertIngredientForm: (
    at: number,
    ingredientForm: IngredientForm,
    options?: FieldArrayMethodProps
  ) => void
  removeIngredientForm: (from: number) => void
}

function useReorderIngredientsForms({
  mealField,
  moveIngredientForm,
  insertIngredientForm,
  removeIngredientForm,
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
      moveIngredientForm(source.index, destination.index)
    } else if (destination.droppableId === mealField.fieldId) {
      let ingredientForm: IngredientForm | undefined = ingredientFormRef.current

      setPendingInsert(() => {
        if (ingredientForm) {
          insertIngredientForm(destination.index, ingredientForm, {
            shouldFocus: false,
          })
        }
      })
    } else if (source.droppableId === mealField.fieldId) {
      removeIngredientForm(source.index)
    }

    saveLastChange()
  })
}

export default useReorderIngredientsForms
