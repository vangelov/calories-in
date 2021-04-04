import { useDietStatsDispatch } from './DietStatsProvider'
import { useEffect } from 'react'
import { Stats } from './types'

function useUpdateMealStats(mealIndex: number, stats: Stats) {
  const dispatch = useDietStatsDispatch()

  useEffect(() => {
    dispatch({ type: 'updateStats', mealIndex, stats })

    return () => {
      dispatch({ type: 'deleteStats', mealIndex })
    }
  })
}

export default useUpdateMealStats
