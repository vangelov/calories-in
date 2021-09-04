import { Stats } from './types'
import { useEffect } from 'react'
import { useMealsStatsActions } from './useMealsStatsStore'

type Params = {
  stats: Stats
  selectedVariantFormFieldId: string
  index: number
}

function useUpdateMealStats({
  stats,
  selectedVariantFormFieldId,
  index,
}: Params) {
  const mealsStatsActions = useMealsStatsActions()

  useEffect(() => {
    mealsStatsActions.setMealStats(selectedVariantFormFieldId, index, stats)

    return () => {
      mealsStatsActions.deleteMealStats(selectedVariantFormFieldId, index)
    }
  }, [stats, mealsStatsActions, index, selectedVariantFormFieldId])
}

export default useUpdateMealStats
