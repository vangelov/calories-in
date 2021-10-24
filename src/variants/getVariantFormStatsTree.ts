import { Food } from 'foods'
import { StatsTree, getStatsTree } from 'stats'
import { VariantForm } from './variantForm'
import { getMealFormStatsTree } from 'meals'

function getVariantFormStatsTree(
  variantForm: VariantForm,
  foodsById: Record<number, Food>
): StatsTree {
  const subtrees = variantForm.mealsForms.map(mealForm =>
    getMealFormStatsTree(mealForm.fieldId, mealForm.ingredientsForms, foodsById)
  )

  return getStatsTree({
    id: variantForm.fieldId,
    subtrees,
  })
}

export default getVariantFormStatsTree
