import { StatsTree, getStatsTree } from 'stats'
import { DietForm } from './dietForm'
import { getVariantFormStatsTree } from 'variants'
import { Food } from 'foods'

function getDietFormStatsTree(
  dietForm: DietForm,
  foodsById: Record<number, Food>
): StatsTree {
  const subtrees = dietForm.variantsForms.map(variantForm =>
    getVariantFormStatsTree(variantForm, foodsById)
  )

  return getStatsTree({
    id: dietForm.fieldId,
    subtrees,
    calculateAvg: true,
  })
}

export default getDietFormStatsTree
