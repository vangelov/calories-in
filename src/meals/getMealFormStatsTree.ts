import { Food } from 'foods'
import { MealForm } from 'meals'
import { getStatsTree, StatsTree } from 'stats'
import { getIngredientFormStatsTree } from 'ingredients'

function getMealFormStatsTree(
  mealForm: MealForm,
  foodsById: Record<number, Food>
): StatsTree {
  return getStatsTree({
    id: mealForm.fieldId,
    subtrees: mealForm.ingredientsForms.map(ingredientForm =>
      getIngredientFormStatsTree(
        ingredientForm,
        foodsById[ingredientForm.foodId]
      )
    ),
  })
}

export default getMealFormStatsTree
