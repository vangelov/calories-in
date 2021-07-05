import {
  getIngredientsFormsPath,
  IngredientField,
  IngredientForm,
} from './ingredientForm'
import { useFieldArray } from 'react-hook-form'
import tuple from 'general/tuple'
import { useCallback, useMemo } from 'react'
import { getIngredientForm } from './ingredientForm'
import { Food } from 'core/types'
import { DraggableLocation } from 'react-beautiful-dnd'
import { MealField } from '../meals'

type Params = {
  variantIndex: number
  mealIndex: number
  onIngredientsFormsAdded: (ingredientForms: IngredientForm[]) => void
  onChange: () => void
}

export const DEFAULT_AMOUNT_IN_GRAMS = 100

function useIngredientsFormsStore({
  variantIndex,
  mealIndex,
  onIngredientsFormsAdded,
  onChange,
}: Params) {
  const { fields, insert, append, remove, move } = useFieldArray({
    name: getIngredientsFormsPath(variantIndex, mealIndex),
  })

  const ingredientsFields = fields as IngredientField[]

  const addIngredientsForms = useCallback(
    (foods: Food[]) => {
      const ingredientForms = foods.map(({ id }) =>
        getIngredientForm({
          foodId: id,
          amountInGrams: DEFAULT_AMOUNT_IN_GRAMS,
        })
      )

      append(ingredientForms)
      onIngredientsFormsAdded(ingredientForms)
      onChange()
    },
    [append, onIngredientsFormsAdded, onChange]
  )

  const removeIngredientFrom = useCallback(
    (index: number) => {
      remove(index)
      onChange()
    },
    [remove, onChange]
  )

  const reorderIngredientsForms = useCallback(
    (
      source: DraggableLocation,
      destination: DraggableLocation,
      mealField: MealField,
      sourceIngredientForm?: IngredientForm
    ) => {
      if (
        destination.droppableId === source.droppableId &&
        mealField.fieldId === destination.droppableId
      ) {
        move(source.index, destination.index)
      } else if (destination.droppableId === mealField.fieldId) {
        if (sourceIngredientForm) {
          insert(destination.index, sourceIngredientForm, {
            shouldFocus: false,
          })
        }
      } else if (source.droppableId === mealField.fieldId) {
        remove(source.index)
      }

      onChange()
    },
    [move, insert, remove, onChange]
  )

  const methods = useMemo(
    () => ({
      addIngredientsForms,
      removeIngredientFrom,
      reorderIngredientsForms,
    }),
    [addIngredientsForms, removeIngredientFrom, reorderIngredientsForms]
  )

  return tuple(ingredientsFields, methods)
}

type IngredientsFormsStore = ReturnType<typeof useIngredientsFormsStore>

export type { IngredientsFormsStore }

export default useIngredientsFormsStore
