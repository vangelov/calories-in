import { useFoods } from 'foods'
import { IngredientForm } from './ingredientForm'
import { StatsTree, objectFromNutritionDataKeys, Stats } from 'stats'
import { DEFAULT_SERVING_SIZE_IN_GRAMS } from 'foods'
import { getAmountFromPortionToGrams, usePortions } from 'portions'
import { useCallback } from 'react'

function useGetIngredientFormStatsTree() {
  const { foodsById } = useFoods()
  const { portionsById } = usePortions()

  const getIngredientFormStatsTree = useCallback(
    (ingredientForm: IngredientForm): StatsTree => {
      const food = foodsById[ingredientForm.foodId]
      const portion = portionsById[ingredientForm.portionId]

      let stats: Stats

      if (food) {
        const amountInGrams = getAmountFromPortionToGrams(
          Number(ingredientForm.amount),
          portion,
          food
        )
        const servingSizeInGrams =
          food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS
        const scale = amountInGrams / servingSizeInGrams

        stats = {
          amountInGrams,
          ...objectFromNutritionDataKeys(key => Math.round(scale * food[key])),
        }
      } else {
        stats = {
          amountInGrams: 0,
          ...objectFromNutritionDataKeys(() => 0),
        }
      }

      return {
        id: ingredientForm.fieldId,
        stats,
        subtrees: [],
      }
    },
    [foodsById, portionsById]
  )

  return getIngredientFormStatsTree
}

export default useGetIngredientFormStatsTree
