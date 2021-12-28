import { getStatsTree, StatsTree } from 'stats'
import { useGetIngredientFormStatsTree } from 'ingredients'
import { MealForm } from 'meals'
import { useCallback } from 'react'

function useGetMealFormStatsTree() {
  const getIngredientFormStatsTree = useGetIngredientFormStatsTree()

  const getMealFormStatsTree = useCallback(
    (mealForm: MealForm): StatsTree => {
      return getStatsTree({
        id: mealForm.fieldId,
        subtrees: mealForm.ingredientsForms.map(ingredientForm =>
          getIngredientFormStatsTree(ingredientForm)
        ),
      })
    },
    [getIngredientFormStatsTree]
  )

  return getMealFormStatsTree
}

export default useGetMealFormStatsTree
