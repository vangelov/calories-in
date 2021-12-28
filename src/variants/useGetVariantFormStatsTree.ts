import { StatsTree, getStatsTree } from 'stats'
import { VariantForm } from './variantForm'
import { useGetMealFormStatsTree } from 'meals'
import { useCallback } from 'react'

function useGetVariantFormStatsTree() {
  const getMealFormStatsTree = useGetMealFormStatsTree()

  const getVariantFormStatsTree = useCallback(
    (variantForm: VariantForm): StatsTree => {
      const subtrees = variantForm.mealsForms.map(mealForm =>
        getMealFormStatsTree(mealForm)
      )

      return getStatsTree({
        id: variantForm.fieldId,
        subtrees,
      })
    },
    [getMealFormStatsTree]
  )

  return getVariantFormStatsTree
}

export default useGetVariantFormStatsTree
