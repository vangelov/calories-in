import { getIngredientForm, IngredientForm, MealField } from 'core/dietForm'
import { useDragAndDropResponder } from 'core/dndResponders'
import { useFoodsByIdDispatch } from 'core/foods/FoodsByIdProvider'
import { useFoodsListState } from 'core/foods/FoodsListProvider'
import { useUndoRedoMethods } from 'core/undoRedo'
import { DropResult } from 'react-beautiful-dnd'
import { useFoodsDragAndDropState } from './FoodsDragAndDropProvider'
import { isFoodCategoryDroppableId } from 'core/foodsCategories'
import { FieldArrayMethodProps } from 'react-hook-form'
import { useLayoutEffect, useState } from 'react'
import { useLastFieldIdProvider } from './LastFieldIdProvider'

type FunctionsParams = {
  mealField: MealField
  moveIngredientForm: (from: number, to: number) => void
  insertIngredientForm: (
    at: number,
    ingredientForm: IngredientForm,
    options?: FieldArrayMethodProps
  ) => void
  removeIngredientForm: (from: number) => void
}

const DEFAULT_AMOUNT_IN_GRAMS = 100

type PendingInsert = {
  ingredientForm: IngredientForm
  index: number
}

function useReorderIngredientsForms({
  mealField,
  moveIngredientForm,
  insertIngredientForm,
  removeIngredientForm,
}: FunctionsParams) {
  const ingredientFormRef = useFoodsDragAndDropState()
  const { saveLastChange } = useUndoRedoMethods()
  const foodsByIdDispatch = useFoodsByIdDispatch()
  const foodsListState = useFoodsListState()
  const [pendingInsert, setPendingInsert] = useState<PendingInsert>()
  const { setLastFieldId } = useLastFieldIdProvider()

  if (!ingredientFormRef) {
    throw new Error('Missing FoodsDragAndDropProvider')
  }

  useLayoutEffect(() => {
    if (pendingInsert) {
      const { index, ingredientForm } = pendingInsert
      insertIngredientForm(index, ingredientForm, { shouldFocus: false })
    }
  }, [pendingInsert, insertIngredientForm])

  useDragAndDropResponder('onDragEnd', (result: DropResult) => {
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

      if (isFoodCategoryDroppableId(source.droppableId)) {
        const food = foodsListState[source.index]

        foodsByIdDispatch({ type: 'addFood', food })

        ingredientForm = getIngredientForm({
          foodId: food.id,
          amountInGrams: DEFAULT_AMOUNT_IN_GRAMS,
        })

        setLastFieldId(ingredientForm.fieldId)
      } else {
        // This form was saved at the beginning of the drag by FoodsDragAndDropProvider
        ingredientForm = ingredientFormRef.current
      }

      if (ingredientForm) {
        setPendingInsert({ ingredientForm, index: destination.index })
      }
    } else if (source.droppableId === mealField.fieldId) {
      removeIngredientForm(source.index)
    }

    saveLastChange()
  })
}

export default useReorderIngredientsForms
