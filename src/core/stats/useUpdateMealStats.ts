import { Stats } from './types'
import { useEffect } from 'react'
import { useMealsStatsActions } from './useMealsStatsStore'

function useUpdateMealStats(ingredientsStatsSum: Stats, index: number) {
  const mealsStatsActions = useMealsStatsActions()

  useEffect(() => {
    mealsStatsActions.setMealStats(index, ingredientsStatsSum)

    return () => {
      mealsStatsActions.deleteMealStats(index)
    }
  }, [ingredientsStatsSum, mealsStatsActions, index])
}

export default useUpdateMealStats
