import { IngredientForm } from 'ingredients'
import objectFromNutritionDataKeys from './objectFromNutritionDataKeys'
import { DEFAULT_SERVING_SIZE_IN_GRAMS, Food } from 'foods'
import { useMemo } from 'react'
import sumStats from './calculations/sumStats'
import { Stats } from './types'

function getIngredientFormStats(
  ingredientForm: IngredientForm,
  food: Food
): Stats {
  const amountInGrams = Math.round(Number(ingredientForm.amountInGrams))
  const servingSizeInGrams =
    food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS
  const scale = amountInGrams / servingSizeInGrams

  return {
    amountInGrams,
    ...objectFromNutritionDataKeys(key => Math.round(scale * food[key])),
  }
}

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
