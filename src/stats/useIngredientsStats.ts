import { IngredientForm } from 'ingredients'
import { Food } from 'foods'
import { useMemo } from 'react'
import { sumStats, getIngredientFormStats } from './calculations'

function useIngredientsStats(
  ingredientsForms: IngredientForm[],
  foods: Record<number, Food>
) {
  const ingredientsStats = useMemo(
    () =>
      ingredientsForms.map(ingredientForm =>
        getIngredientFormStats(ingredientForm, foods[ingredientForm.foodId])
      ),
    [ingredientsForms, foods]
  )

  const ingredientsStatsSum = useMemo(() => sumStats(ingredientsStats), [
    ingredientsStats,
  ])

  return { ingredientsStats, ingredientsStatsSum }
}

export default useIngredientsStats
