import { StatsTree, getStatsTree } from 'stats'
import { VariantForm } from './variantForm'
import { useGetMealFormStatsTree } from 'meals'

function useGetVariantFormStatsTree() {
  const getMealFormStatsTree = useGetMealFormStatsTree()

  function getVariantFormStatsTree(variantForm: VariantForm): StatsTree {
    const subtrees = variantForm.mealsForms.map(mealForm =>
      getMealFormStatsTree(mealForm)
    )

    return getStatsTree({
      id: variantForm.fieldId,
      subtrees,
    })
  }

  return getVariantFormStatsTree
}

export default useGetVariantFormStatsTree
