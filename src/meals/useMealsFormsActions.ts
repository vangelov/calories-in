import { useCallback, SetStateAction } from 'react'
import { DietForm } from 'diets'
import produce from 'immer'
import {
  getInsertMealFormAnimationKey,
  getMealForm,
  MealForm,
} from './mealForm'
import { OneTimeCheckActions } from 'general/oneTimeCheck'

type Params = {
  setDietForm: (action: SetStateAction<DietForm>) => void
  oneTimeCheckActions: OneTimeCheckActions
}

function useMealsFormsActions({ setDietForm, oneTimeCheckActions }: Params) {
  const appendMealForm = useCallback(
    () =>
      setDietForm(
        produce(draftDietForm => {
          const mealForm = getMealForm()
          const { selectedVariantFormIndex, variantsForms } = draftDietForm

          oneTimeCheckActions.set(
            getInsertMealFormAnimationKey(mealForm.fieldId)
          )

          variantsForms[selectedVariantFormIndex].mealsForms.push(mealForm)
        })
      ),
    [setDietForm, oneTimeCheckActions]
  )

  const removeMealForm = useCallback(
    (variantIndex: number, mealFormIndex: number) =>
      setDietForm(
        produce(draftDietForm => {
          draftDietForm.variantsForms[variantIndex].mealsForms.splice(
            mealFormIndex,
            1
          )
        })
      ),
    [setDietForm]
  )

  const moveMealForm = useCallback(
    (fromIndex: number, toIndex: number) =>
      setDietForm(
        produce(draftDietForm => {
          const { variantsForms, selectedVariantFormIndex } = draftDietForm
          const mealsForms = variantsForms[selectedVariantFormIndex].mealsForms

          const mealForm = mealsForms[fromIndex]
          mealsForms.splice(fromIndex, 1)
          mealsForms.splice(toIndex, 0, mealForm)
        })
      ),
    [setDietForm]
  )

  const updateMealForm = useCallback(
    (
      variantFormIndex: number,
      mealFormIndex: number,
      partialMealForm: Partial<MealForm>
    ) => {
      setDietForm(
        produce(draftDietForm => {
          const { mealsForms } = draftDietForm.variantsForms[variantFormIndex]
          const mealForm = mealsForms[mealFormIndex]
          mealsForms[mealFormIndex] = {
            ...mealForm,
            ...partialMealForm,
          }
        })
      )
    },
    [setDietForm]
  )

  return {
    appendMealForm,
    removeMealForm,
    moveMealForm,
    updateMealForm,
  }
}

type MealsFormsActions = ReturnType<typeof useMealsFormsActions>

export type { MealsFormsActions }

export default useMealsFormsActions
