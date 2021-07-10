import {
  getIngredientsFormsPath,
  IngredientField,
  IngredientForm,
} from './ingredientForm'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import tuple from 'general/tuple'
import { useRef } from 'react'
import { getIngredientForm } from './ingredientForm'
import { Food } from 'core/types'
import { DraggableLocation } from 'react-beautiful-dnd'
import { MealField } from '../meals'
import { DietForm } from '../dietForm'

type Params = {
  variantIndex: number
  mealIndex: number
  onBeforeAddIngredientsForms: (ingredientForms: IngredientForm[]) => void
  onAfterChange: () => void
  dietFormMethods: UseFormReturn<DietForm>
}

export const DEFAULT_AMOUNT_IN_GRAMS = 100

function useIngredientsFormsStore({
  variantIndex,
  mealIndex,
  onBeforeAddIngredientsForms,
  onAfterChange,
  dietFormMethods,
}: Params) {
  const savedIngredientFormForDrag = useRef<IngredientForm>()
  const { getValues, control } = dietFormMethods
  const { fields, insert, append, remove, move } = useFieldArray({
    name: getIngredientsFormsPath(variantIndex, mealIndex) as any,
    control,
  })

  const ingredientsFields = fields as IngredientField[]

  function addIngredientsForms(foods: Food[]) {
    const ingredientForms = foods.map(({ id }) =>
      getIngredientForm({
        foodId: id,
        amountInGrams: DEFAULT_AMOUNT_IN_GRAMS,
      })
    )

    onBeforeAddIngredientsForms(ingredientForms)
    append(ingredientForms)
    onAfterChange()
  }

  function removeIngredientFrom(index: number) {
    remove(index)
    onAfterChange()
  }

  function saveIngredientFormForDrag(mealFieldId: string, index: number) {
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
  }

  function reorderIngredientsForms(
    source: DraggableLocation,
    destination: DraggableLocation,
    mealField: MealField
  ) {
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
  }

  const methods = {
    addIngredientsForms,
    removeIngredientFrom,
    reorderIngredientsForms,
    saveIngredientFormForDrag,
  }

  return tuple(ingredientsFields, methods)
}

type IngredientsFormsStore = ReturnType<typeof useIngredientsFormsStore>

export type { IngredientsFormsStore }

export default useIngredientsFormsStore
