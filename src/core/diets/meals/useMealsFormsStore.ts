import { getMealForm, getMealsFormsPath, MealField, MealForm } from './mealForm'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useCallback, useMemo } from 'react'
import tuple from 'general/tuple'

type Params = {
  variantIndex: number
  onBeforeMealFormAppend: (mealForm: MealForm) => void
  onAfterChange: () => void
}

function useMealsFormsStore({
  variantIndex,
  onBeforeMealFormAppend,
  onAfterChange,
}: Params) {
  const { getValues } = useFormContext()

  const { fields, append, remove, move } = useFieldArray({
    name: getMealsFormsPath(variantIndex),
  })

  const mealsFields = fields as MealField[]

  const getLatestMealFormAt = useCallback(
    (variantIndex: number, mealIndex: number) => {
      const dietForm = getValues()
      const { variantsForms } = dietForm
      const mealForm = variantsForms[variantIndex].mealsForms[mealIndex]

      return mealForm
    },
    [getValues]
  )

  const appendNewMealForm = useCallback(() => {
    const mealForm = getMealForm()

    onBeforeMealFormAppend(mealForm)
    append(mealForm)
    onAfterChange()

    return mealForm.fieldId
  }, [append, onBeforeMealFormAppend, onAfterChange])

  const removeMealFrom = useCallback(
    (index: number) => {
      remove(index)
      onAfterChange()
    },
    [remove, onAfterChange]
  )

  const reorderMealsForms = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      move(sourceIndex, destinationIndex)
      onAfterChange()
    },
    [move, onAfterChange]
  )

  const methods = useMemo(
    () => ({
      getLatestMealFormAt,
      appendNewMealForm,
      removeMealFrom,
      reorderMealsForms,
    }),
    [getLatestMealFormAt, appendNewMealForm, removeMealFrom, reorderMealsForms]
  )

  return tuple(mealsFields, methods)
}

type MealsFormsStore = ReturnType<typeof useMealsFormsStore>

export type { MealsFormsStore }

export default useMealsFormsStore
