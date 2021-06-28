import { getMealsFormsPath, MealField } from './mealForm'
import { useFieldArray, useFormContext } from 'react-hook-form'

type Params = {
  variantIndex: number
}

function useMealsFieldArray({ variantIndex }: Params) {
  const { getValues } = useFormContext()

  const {
    fields: mealsFields,
    append: appendMealForm,
    remove: removeMealForm,
    move: moveMealForm,
  } = useFieldArray({
    name: getMealsFormsPath(variantIndex),
  })

  function getMealFormAt(variantIndex: number, mealIndex: number) {
    const dietForm = getValues()
    const { variantsForms } = dietForm
    const mealForm = variantsForms[variantIndex].mealsForms[mealIndex]

    return mealForm
  }

  return {
    mealsFields: mealsFields as MealField[],
    removeMealForm,
    appendMealForm,
    moveMealForm,
    getMealFormAt,
  }
}

type MealsFieldArray = ReturnType<typeof useMealsFieldArray>

export type { MealsFieldArray }

export default useMealsFieldArray
