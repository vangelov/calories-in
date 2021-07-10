import { useWatch } from 'react-hook-form'
import { MealField, getIngredientsFormsPath, IngredientForm } from 'core/diets'
import sumStats from './sumStats'
import { useFoodsStoreState } from 'core/foods'
import getIngredientStats from './getIngredientStats'

type Params = {
  variantIndex: number
  mealIndex: number
  mealField: MealField
}

function useIngredientsStatsStore({
  variantIndex,
  mealIndex,
  mealField,
}: Params) {
  const ingredientsForms = useWatch({
    name: getIngredientsFormsPath(variantIndex, mealIndex),
    defaultValue: mealField.ingredientsForms,
  }) as IngredientForm[]

  const { getFoodById } = useFoodsStoreState()
  const ingredientsStats = (ingredientsForms || []).map(ingredientsForm => {
    const { amountInGrams } = ingredientsForm
    const food = getFoodById(ingredientsForm.foodId)

    return getIngredientStats(amountInGrams, food)
  })

  const ingredientsStatsSum = sumStats(ingredientsStats)

  return [
    {
      ingredientsStatsSum,
    },
  ]
}

type IngredientsStatsStore = ReturnType<typeof useIngredientsStatsStore>

export type { IngredientsStatsStore }

export default useIngredientsStatsStore
