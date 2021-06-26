import { getMealsFormsPath, MealField } from './mealForm'
import { useFieldArray } from 'react-hook-form'

type Params = {
  variantIndex: number
}

function useMealsFieldArray({ variantIndex }: Params) {
  const {
    fields: mealsFields,
    append: appendMealForm,
    remove: removeMealForm,
    move: moveMealForm,
  } = useFieldArray({
    name: getMealsFormsPath(variantIndex),
  })

  return {
    mealsFields: mealsFields as MealField[],
    removeMealForm,
    appendMealForm,
    moveMealForm,
  }
}

type MealsFieldArray = ReturnType<typeof useMealsFieldArray>

export type { MealsFieldArray }

export default useMealsFieldArray
