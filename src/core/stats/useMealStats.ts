import { useFormContext, useWatch } from 'react-hook-form'
import {
  MealField,
  getIngredientsFormsPath,
  IngredientForm,
} from 'core/dietForm'
import sumStats from './sumStats'
import { useFoodsByIdState } from 'core/foods'
import getIngredientStats from './getIngredientStats'

function useMealStats(
  variantIndex: number,
  mealIndex: number,
  mealField: MealField
) {
  const { control } = useFormContext()
  const ingredientsForms = useWatch({
    control,
    name: getIngredientsFormsPath(variantIndex, mealIndex),
    defaultValue: mealField.ingredientsForms,
  }) as IngredientForm[]

  const foodsByIdState = useFoodsByIdState()

  const ingredientsStats = (ingredientsForms || []).map(ingredientsForm => {
    const { amountInGrams } = ingredientsForm
    const food = foodsByIdState[ingredientsForm.foodId]

    return getIngredientStats(amountInGrams, food)
  })

  const mealStats = sumStats(ingredientsStats)

  return {
    ingredientsStats,
    mealStats,
  }
}

export default useMealStats
