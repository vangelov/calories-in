import { Food, FoodId } from 'foods'
import { getStatsTree, StatsTree } from 'stats'
import { getIngredientFormStatsTree, IngredientForm } from 'ingredients'

function getMealFormStatsTree(
  fieldId: string,
  ingredientsForms: IngredientForm[],
  foodsById: Record<FoodId, Food>
): StatsTree {
  return getStatsTree({
    id: fieldId,
    subtrees: ingredientsForms.map(ingredientForm =>
      getIngredientFormStatsTree(
        ingredientForm,
        foodsById[ingredientForm.foodId]
      )
    ),
  })
}

export default getMealFormStatsTree
