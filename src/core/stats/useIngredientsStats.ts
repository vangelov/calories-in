import { IngredientForm } from 'core/diets'
import { Food } from 'core/types'
import { useMemo } from 'react'
import getIngredientStats from './getIngredientStats'
import sumStats from './sumStats'

function useIngredientsStats(
  ingredientsForms: IngredientForm[],
  foods: Record<number, Food>
) {
  const ingredientsStats = useMemo(
    () =>
      ingredientsForms.map(ingredientsForm =>
        getIngredientStats(
          Math.round(Number(ingredientsForm.amountInGrams)),
          foods[ingredientsForm.foodId]
        )
      ),
    [ingredientsForms, foods]
  )

  const ingredientsStatsSum = useMemo(() => sumStats(ingredientsStats), [
    ingredientsStats,
  ])

  return { ingredientsStats, ingredientsStatsSum }
}

export default useIngredientsStats
