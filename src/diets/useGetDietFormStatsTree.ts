import { StatsTree, getStatsTree } from 'stats'
import { DietForm } from './dietForm'
import { useGetVariantFormStatsTree } from 'variants'
import { useCallback } from 'react'

function useGetDietFormStatsTree() {
  const getVariantFormStatsTree = useGetVariantFormStatsTree()

  const getDietFormStatsTree2 = useCallback(
    (dietForm: DietForm): StatsTree => {
      const subtrees = dietForm.variantsForms.map(variantForm =>
        getVariantFormStatsTree(variantForm)
      )

      return getStatsTree({
        id: dietForm.fieldId,
        subtrees,
        calculateAvg: true,
      })
    },
    [getVariantFormStatsTree]
  )

  return getDietFormStatsTree2
}

export default useGetDietFormStatsTree
