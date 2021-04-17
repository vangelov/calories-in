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

  const ingredientsStats: Stats[] = ingredientsFields.map(
    (ingredientField, index) => {
      const amountInGrams = ingredientsForms[index]
        ? ingredientsForms[index].amountInGrams
        : ingredientField.amountInGrams

      return { protein: Number(amountInGrams) * 2 }
    }
  )

  const mealStats = sumStats(ingredientsStats)

  return {
    ingredientsStats,
    mealStats,
  }
}

export default useMealStats
