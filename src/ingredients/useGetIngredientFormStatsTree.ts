import { useFoods } from 'foods'
import { IngredientForm } from './ingredientForm'
import { StatsTree, objectFromNutritionDataKeys, Stats } from 'stats'
import { DEFAULT_SERVING_SIZE_IN_GRAMS } from 'foods'
import { useGetAmount } from 'portions'
import { useCallback } from 'react'
import amountAsNumber from 'stats/amountAsNumber'

function useGetIngredientFormStatsTree() {
  const { foodsById } = useFoods()
  const { getAmountFromPortionToGrams } = useGetAmount()

  const getIngredientFormStatsTree = useCallback(
    (ingredientForm: IngredientForm): StatsTree => {
      const food = foodsById[ingredientForm.foodId]
      let stats: Stats

      if (food) {
        const amountInGrams = getAmountFromPortionToGrams(
          amountAsNumber(ingredientForm.amount),
          ingredientForm.portionId,
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
    [foodsById, getAmountFromPortionToGrams]
  )

  return getIngredientFormStatsTree
}

export default useGetIngredientFormStatsTree
