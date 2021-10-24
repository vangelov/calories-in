import { StatsTree, getStatsTree } from 'stats'
import { DietForm } from './dietForm'
import { useGetVariantFormStatsTree } from 'variants'

function useGetDietFormStatsTree() {
  const getVariantFormStatsTree = useGetVariantFormStatsTree()

  function getDietFormStatsTree(dietForm: DietForm): StatsTree {
    const subtrees = dietForm.variantsForms.map(variantForm =>
      getVariantFormStatsTree(variantForm)
    )

    return getStatsTree({
      id: dietForm.fieldId,
      subtrees,
      calculateAvg: true,
    })
  }

  return getDietFormStatsTree
}

export default useGetDietFormStatsTree
