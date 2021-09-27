import { Food, FoodId } from 'foods'
import { MealForm } from 'meals'
import { getStatsTree, StatsTree } from 'stats'
import { getIngredientFormStatsTree } from 'ingredients'

function getMealFormStatsTree(
  mealForm: MealForm,
  foodsById: Record<FoodId, Food>
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
