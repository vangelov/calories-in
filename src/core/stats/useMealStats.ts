import { useFormContext, useWatch } from 'react-hook-form'
import {
  MealField,
  getIngredientsFormsPath,
  IngredientForm,
} from 'core/dietForm'
import sumStats from './sumStats'
import { useDietFoodsState } from 'core/foods'
import getIngredientStats from './getIngredientStats'

function useMealStats(mealIndex: number, mealField: MealField) {
  const { control } = useFormContext()
  const ingredientsForms = useWatch({
    control,
    name: getIngredientsFormsPath(mealIndex),
    defaultValue: mealField.ingredientsForms,
  }) as IngredientForm[]

  const foodsByIdState = useDietFoodsState()

  const ingredientsStats = ingredientsForms.map(ingredientsForm => {
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
