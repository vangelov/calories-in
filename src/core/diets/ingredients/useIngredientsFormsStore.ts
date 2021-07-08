import {
  getIngredientsFormsPath,
  IngredientField,
  IngredientForm,
} from './ingredientForm'
import { useFieldArray, useFormContext } from 'react-hook-form'
import tuple from 'general/tuple'
import { useCallback, useMemo, useRef } from 'react'
import { getIngredientForm } from './ingredientForm'
import { Food } from 'core/types'
import { DraggableLocation } from 'react-beautiful-dnd'
import { MealField } from '../meals'

type Params = {
  variantIndex: number
  mealIndex: number
  onBeforeAddIngredientsForms: (ingredientForms: IngredientForm[]) => void
  onAfterChange: () => void
}

export const DEFAULT_AMOUNT_IN_GRAMS = 100

function useIngredientsFormsStore({
  variantIndex,
  mealIndex,
  onBeforeAddIngredientsForms,
  onAfterChange,
}: Params) {
  const savedIngredientFormForDrag = useRef<IngredientForm>()
  const { getValues } = useFormContext()
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

      onBeforeAddIngredientsForms(ingredientForms)
      append(ingredientForms)
      onAfterChange()
    },
    [append, onBeforeAddIngredientsForms, onAfterChange]
  )

  const removeIngredientFrom = useCallback(
    (index: number) => {
      remove(index)
      onAfterChange()
    },
    [remove, onAfterChange]
  )

  const saveIngredientFormForDrag = useCallback(
    (mealFieldId: string, index: number) => {
      const values = getValues()

      let sourceMealForm = null

      for (const variantForm of values.variantsForms) {
        for (const mealForm of variantForm.mealsForms) {
          if (mealForm.fieldId === mealFieldId) {
            sourceMealForm = mealForm
          }
        }
      }

      if (sourceMealForm) {
        const ingredientForm = sourceMealForm.ingredientsForms[index]
        savedIngredientFormForDrag.current = ingredientForm
      }
    },
    [getValues]
  )

  const reorderIngredientsForms = useCallback(
    (
      source: DraggableLocation,
      destination: DraggableLocation,
      mealField: MealField
    ) => {
      if (
        destination.droppableId === source.droppableId &&
        mealField.fieldId === destination.droppableId
      ) {
        move(source.index, destination.index)
      } else if (destination.droppableId === mealField.fieldId) {
        if (savedIngredientFormForDrag.current) {
          insert(destination.index, savedIngredientFormForDrag.current, {
            shouldFocus: false,
          })
        }
      } else if (source.droppableId === mealField.fieldId) {
        remove(source.index)
      }

      onAfterChange()
    },
    [move, insert, remove, onAfterChange]
  )

  const methods = useMemo(
    () => ({
      addIngredientsForms,
      removeIngredientFrom,
      reorderIngredientsForms,
      saveIngredientFormForDrag,
    }),
    [
      addIngredientsForms,
      removeIngredientFrom,
      reorderIngredientsForms,
      saveIngredientFormForDrag,
    ]
  )

  return tuple(ingredientsFields, methods)
}

type IngredientsFormsStore = ReturnType<typeof useIngredientsFormsStore>

export type { IngredientsFormsStore }

export default useIngredientsFormsStore
