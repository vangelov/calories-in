import { useCallback, SetStateAction } from 'react'
import { DietForm } from 'diets'
import produce from 'immer'
import {
  getInsertMealFormAnimationKey,
  getMealForm,
  MealForm,
} from './mealForm'
import { OneTimeCheckActions } from 'general'
import { duplicate } from 'form'
import { getDuplicatedName } from 'form/names'

type Params = {
  setDietForm: (action: SetStateAction<DietForm>) => void
  oneTimeCheckActions: OneTimeCheckActions
}

function useMealsFormsActions({ setDietForm, oneTimeCheckActions }: Params) {
  const appendMealForm = useCallback(
    (mealForm?: MealForm) =>
      setDietForm(
        produce(draftDietForm => {
          const mealFormToAppend = mealForm || getMealForm()
          const { selectedVariantFormIndex, variantsForms } = draftDietForm

          oneTimeCheckActions.set(
            getInsertMealFormAnimationKey(mealFormToAppend.fieldId)
          )

          variantsForms[selectedVariantFormIndex].mealsForms.push(
            mealFormToAppend
          )
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
          } as MealForm
        })
      )
    },
    [setDietForm]
  )

  const duplicateMealForm = useCallback(
    (variantFormIndex: number, mealFormIndex: number) =>
      setDietForm(
        produce(draftDietForm => {
          const { mealsForms } = draftDietForm.variantsForms[variantFormIndex]
          const mealForm = mealsForms[mealFormIndex]
          const newMealForm = {
            ...duplicate(mealForm),
            name: getDuplicatedName(mealFormIndex, mealsForms),
          }
          appendMealForm(newMealForm)
        })
      ),
    [setDietForm, appendMealForm]
  )

  return {
    appendMealForm,
    removeMealForm,
    moveMealForm,
    updateMealForm,
    duplicateMealForm,
  }
}

type MealsFormsActions = ReturnType<typeof useMealsFormsActions>

export type { MealsFormsActions }

export default useMealsFormsActions
