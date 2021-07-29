import { IngredientForm } from 'core/diets'
import { Food } from 'core/types'
import { useMemo } from 'react'
import sumStats from './calculations/sumStats'
import { Stats } from './types'

function getIngredientFormStats(
  ingredientForm: IngredientForm,
  food: Food
): Stats {
  const amountInGrams = Math.round(Number(ingredientForm.amountInGrams))

  const scale = amountInGrams / 100
  const energy = Math.round(scale * food.energy)
  const protein = Math.round(scale * food.protein)
  const carbs = Math.round(scale * food.carbs)
  const fat = Math.round(scale * food.fat)

  return {
    amountInGrams,
    energy,
    protein,
    carbs,
    fat,
    saturatedFat: 0,
    sugar: 0,
    sodium: 0,
    fiber: 0,
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
