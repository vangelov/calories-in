import { useFormContext, useWatch } from 'react-hook-form'
import {
  IngredientField,
  MealField,
  getIngredientsFormsPath,
  IngredientForm,
} from 'core/dietForm'
import { Stats } from './types'
import { sumStats } from './utils'

function useMealStats(
  mealIndex: number,
  mealField: MealField,
  ingredientsFields: IngredientField[]
) {
  const { control } = useFormContext()
  const ingredientsForms = useWatch({
    control,
    name: getIngredientsFormsPath(mealIndex),
    defaultValue: mealField.ingredientsForms,
  }) as IngredientForm[]

  const ingredientsStats: Stats[] = ingredientsForms.map(ingredientsForm => {
    return {
      protein: Number(ingredientsForm.amountInGrams) * 2,
      amountInGrams: Number(ingredientsForm.amountInGrams),
    }
  })

  const mealStats = sumStats(ingredientsStats)

  return {
    ingredientsStats,
    mealStats,
  }
}

export default useMealStats
