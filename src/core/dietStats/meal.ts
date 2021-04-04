import { useFormContext, useWatch } from 'react-hook-form'
import {
  IngredientField,
  MealField,
  getIngredinetsFormsPath,
} from 'core/dietForm'
import { Stats } from './types'
import { sumStats } from './utils'

function useMealStats(
  mealIndex: number,
  mealField: MealField,
  ingredientsFields: IngredientField[]
) {
  const { control } = useFormContext()
  const ingredientsForms =
    useWatch({
      control,
      name: getIngredinetsFormsPath(mealIndex),
      defaultValue: mealField.ingredientsForms,
    }) || []

  const ingredientsStats: Stats[] = ingredientsForms.map(
    (ingredientForm, index) => {
      const amountInGrams = ingredientForm
        ? ingredientForm.amountInGrams
        : ingredientsFields[index].amountInGrams

      return { protein: Number(amountInGrams) * 2 }
    }
  )

  const mealStats = sumStats(ingredientsStats)

  return {
    ingredientsStats,
    mealStats,
  }
}

export { useMealStats }
