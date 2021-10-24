import { getStatsTree, StatsTree } from 'stats'
import { useGetIngredientFormStatsTree } from 'ingredients'
import { MealForm } from 'meals'

function useGetMealFormStatsTree() {
  const getIngredientFormStatsTree = useGetIngredientFormStatsTree()

  function getMealFormStatsTree(mealForm: MealForm): StatsTree {
    return getStatsTree({
      id: mealForm.fieldId,
      subtrees: mealForm.ingredientsForms.map(ingredientForm =>
        getIngredientFormStatsTree(ingredientForm)
      ),
    })
  }

  return getMealFormStatsTree
}

export default useGetMealFormStatsTree
