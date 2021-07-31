import { Stats } from './types'
import { useEffect } from 'react'
import { useMealsStatsActions } from './useMealsStatsStore'

type Params = {
  ingredientsStatsSum: Stats
  selectedVariantFormFieldId: string
  index: number
}

function useUpdateMealStats({
  ingredientsStatsSum,
  selectedVariantFormFieldId,
  index,
}: Params) {
  const mealsStatsActions = useMealsStatsActions()

  useEffect(() => {
    mealsStatsActions.setMealStats(
      selectedVariantFormFieldId,
      index,
      ingredientsStatsSum
    )

    return () => {
      mealsStatsActions.deleteMealStats(selectedVariantFormFieldId, index)
    }
  }, [
    ingredientsStatsSum,
    mealsStatsActions,
    index,
    selectedVariantFormFieldId,
  ])
}

export default useUpdateMealStats
