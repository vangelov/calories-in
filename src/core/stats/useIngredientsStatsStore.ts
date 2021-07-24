import { MealForm, IngredientForm } from 'core/diets'
import sumStats from './sumStats'
import { useFoodsStoreState } from 'core/foods'
import getIngredientStats from './getIngredientStats'

type Params = {
  variantIndex: number
  mealIndex: number
  mealForm: MealForm
}

function useIngredientsStatsStore({
  variantIndex,
  mealIndex,
  mealForm,
}: Params) {
  const ingredientsForms = [] as IngredientForm[] /*useWatch({
    name: getIngredientsFormsPath(variantIndex, mealIndex),
    defaultValue: mealForm.ingredientsForms,
  }) as IngredientForm[]*/

  const { getFoodById } = useFoodsStoreState()
  const ingredientsStats = (ingredientsForms || []).map(ingredientsForm => {
    const { amountInGrams } = ingredientsForm
    const food = getFoodById(ingredientsForm.foodId)

    return getIngredientStats(Math.round(Number(amountInGrams)), food)
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
