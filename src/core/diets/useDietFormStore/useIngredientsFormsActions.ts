import { useCallback, SetStateAction } from 'react'
import { DietForm } from '../dietForm'
import produce from 'immer'
import { Food } from 'core/types'
import { getIngredientForm, IngredientForm } from '../ingredients'

type Params = {
  setDietForm: (action: SetStateAction<DietForm>) => void
}

const DEFAULT_AMOUNT_IN_GRAMS = 100

function useIngredientsFormsActions({ setDietForm }: Params) {
  const appendIngredientsForms = useCallback(
    (variantFormIndex: number, mealFormIndex: number, foods: Food[]) => {
      setDietForm(dietForm =>
        produce(dietForm, draftDietForm => {
          const ingredientForms = foods.map(({ id }) =>
            getIngredientForm({
              foodId: id,
              amountInGrams: DEFAULT_AMOUNT_IN_GRAMS,
            })
          )
          const { variantsForms } = draftDietForm
          const { mealsForms } = variantsForms[variantFormIndex]
          const { ingredientsForms } = mealsForms[mealFormIndex]
          ingredientsForms.push(...ingredientForms)
        })
      )
    },
    [setDietForm]
  )

  const removeIngredientForm = useCallback(
    (
      variantFormIndex: number,
      mealFormIndex: number,
      ingredientFormIndex: number
    ) => {
      setDietForm(dietForm =>
        produce(dietForm, draftDietForm => {
          const { variantsForms } = draftDietForm
          const { mealsForms } = variantsForms[variantFormIndex]
          const { ingredientsForms } = mealsForms[mealFormIndex]

          ingredientsForms.splice(ingredientFormIndex, 1)
        })
      )
    },
    [setDietForm]
  )

  const setIngredientForm = useCallback(
    (
      variantFormIndex: number,
      mealFormIndex: number,
      ingredinetFormIndex: number,
      partialIngredientForm: Partial<IngredientForm>
    ) => {
      setDietForm(dietForm =>
        produce(dietForm, draftDietForm => {
          const { variantsForms } = draftDietForm
          const { mealsForms } = variantsForms[variantFormIndex]
          const { ingredientsForms } = mealsForms[mealFormIndex]
          const ingredientForm = ingredientsForms[ingredinetFormIndex]

          ingredientsForms[ingredinetFormIndex] = {
            ...ingredientForm,
            ...partialIngredientForm,
          }
        })
      )
    },
    [setDietForm]
  )

  const moveIngredientForm = useCallback(
    (
      variantFormIndex: number,
      sourceMealFormId: string,
      sourceIngredientFormIndex: number,
      destinationMealFormId: string,
      destinationIngredientFormIndex: number
    ) => {
      setDietForm(dietForm =>
        produce(dietForm, draftDietForm => {
          const { mealsForms } = draftDietForm.variantsForms[variantFormIndex]
          const sourceMealForm = mealsForms.find(
            ({ fieldId }) => fieldId === sourceMealFormId
          )
          let ingredientForm

          if (sourceMealForm) {
            ingredientForm =
              sourceMealForm.ingredientsForms[sourceIngredientFormIndex]
            sourceMealForm.ingredientsForms.splice(sourceIngredientFormIndex, 1)
          }

          const destinationMealForm = mealsForms.find(
            ({ fieldId }) => fieldId === destinationMealFormId
          )

          if (destinationMealForm && ingredientForm) {
            destinationMealForm.ingredientsForms.splice(
              destinationIngredientFormIndex,
              0,
              ingredientForm
            )
          }
        })
      )
    },
    [setDietForm]
  )

  return {
    appendIngredientsForms,
    removeIngredientForm,
    setIngredientForm,
    moveIngredientForm,
  }
}

type IngredientsFormsActions = ReturnType<typeof useIngredientsFormsActions>

export type { IngredientsFormsActions }

export default useIngredientsFormsActions
