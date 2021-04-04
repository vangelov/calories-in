import { getIngredientForm, IngredientForm, MealField } from 'core/dietForm'
import { useDragDropEventResponder } from 'core/dndResponders'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useContext } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { StateContext } from './provider'

type FunctionsParams = {
  mealField: MealField
  moveIngredientForm: (from: number, to: number) => void
  insertIngredientForm: (at: number, ingredientForm: IngredientForm) => void
  removeIngredientForm: (from: number) => void
}

function useReorderIngredientsForms({
  mealField,
  moveIngredientForm,
  insertIngredientForm,
  removeIngredientForm,
}: FunctionsParams) {
  const ingredientFormRef = useContext(StateContext)
  const { saveLastChange } = useUndoRedoMethods()

  if (!ingredientFormRef) {
    throw new Error('Missing FoodsDragAndDropProvider')
  }

  useDragDropEventResponder('onDragEnd', (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      mealField.fieldId === destination.droppableId
    ) {
      moveIngredientForm(source.index, destination.index)
    } else if (destination.droppableId === mealField.fieldId) {
      let ingredientForm: IngredientForm | undefined

      if (source.droppableId === 'ITEMS') {
        console.log('s', source)
        ingredientForm = getIngredientForm({ foodId: 1, amountInGrams: 100 })
      } else {
        // This form was saved at the beginning of the drag in FoodsDragAndDropProvider
        ingredientForm = ingredientFormRef.current
      }

      if (ingredientForm) {
        insertIngredientForm(destination.index, ingredientForm)
      }
    } else if (source.droppableId === mealField.fieldId) {
      removeIngredientForm(source.index)
    }

    saveLastChange()
  })
}

export default useReorderIngredientsForms
