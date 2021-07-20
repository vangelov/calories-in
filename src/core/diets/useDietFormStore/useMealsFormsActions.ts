import { useCallback, SetStateAction } from 'react'
import { DietForm } from '../dietForm'
import produce from 'immer'
import { getMealForm, MealForm } from '../meals'

type Params = {
  setDietForm: (action: SetStateAction<DietForm>) => void
  onBeforeAppendMealForm: (mealForm: MealForm) => void
}

function useMealsFormsActions({ setDietForm, onBeforeAppendMealForm }: Params) {
  const appendMealForm = useCallback(
    (variantIndex: number) => {
      setDietForm(dietForm =>
        produce(dietForm, draftDietForm => {
          const mealForm = getMealForm()
          onBeforeAppendMealForm(mealForm)
          draftDietForm.variantsForms[variantIndex].mealsForms.push(mealForm)
        })
      )
    },
    [setDietForm, onBeforeAppendMealForm]
  )

  const removeMealForm = useCallback(
    (variantIndex: number, mealFormIndex: number) => {
      setDietForm(dietForm =>
        produce(dietForm, draftDietForm => {
          draftDietForm.variantsForms[variantIndex].mealsForms.splice(
            mealFormIndex,
            1
          )
        })
      )
    },
    [setDietForm]
  )

  const setMealFormName = useCallback(
    (variantFormIndex: number, mealFormIndex: number, value: string) => {
      setDietForm(dietForm =>
        produce(dietForm, draftDietForm => {
          const { variantsForms } = draftDietForm
          const { mealsForms } = variantsForms[variantFormIndex]
          mealsForms[mealFormIndex].name = value
        })
      )
    },
    [setDietForm]
  )

  const moveMealForm = useCallback(
    (variantIndex: number, fromIndex: number, toIndex: number) => {
      setDietForm(dietForm =>
        produce(dietForm, draftDietForm => {
          const { variantsForms } = draftDietForm
          const mealsForms = variantsForms[variantIndex].mealsForms

          const mealForm = mealsForms[fromIndex]
          mealsForms.splice(fromIndex, 1)
          mealsForms.splice(toIndex, 0, mealForm)

          draftDietForm.selectedVariantFormIndex = toIndex
        })
      )
    },
    [setDietForm]
  )

  const updateMealForm = useCallback(
    (
      variantFormIndex: number,
      mealFormIndex: number,
      partialMealForm: Partial<MealForm>
    ) => {
      setDietForm(dietForm =>
        produce(dietForm, draftDietForm => {
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
    setMealFormName,
    updateMealForm,
  }
}

type MealsFormsActions = ReturnType<typeof useMealsFormsActions>

export type { MealsFormsActions }

export default useMealsFormsActions
