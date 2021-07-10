import tuple from 'general/tuple'
import { Stats } from './types'
import { useState, useCallback, useMemo } from 'react'
import sumStats from './sumStats'

function useMealsStatsStore() {
  const [mealStats, setMealsStats] = useState<Record<number, Stats>>({})

  const addMealStats = useCallback((index: number, stats: Stats) => {
    setMealsStats(state => {
      return {
        ...state,
        [index]: stats,
      }
    })
  }, [])

  const deleteMealStats = useCallback((index: number) => {
    setMealsStats(state => {
      const newState = { ...state }
      delete newState[index]
      return newState
    })
  }, [])

  const methods = useMemo(
    () => ({
      addMealStats,
      deleteMealStats,
    }),
    [addMealStats, deleteMealStats]
  )

  const state = useMemo(() => {
    const mealsStats = Object.values(mealStats)

    return {
      mealStats,
      mealsStatsSum: sumStats(mealsStats),
    }
  }, [mealStats])

  return tuple(state, methods)
}

type MealsStatsStore = ReturnType<typeof useMealsStatsStore>

export type { MealsStatsStore }

export default useMealsStatsStore
