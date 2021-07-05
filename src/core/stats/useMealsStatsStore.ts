import tuple from 'general/tuple'
import { Stats } from './types'
import { useState, useCallback, useMemo } from 'react'
import sumStats from './sumStats'

function useMealsStatsStore() {
  const [state, setState] = useState<Record<number, Stats>>({})

  const addMealStats = useCallback((index: number, stats: Stats) => {
    setState(state => {
      return {
        ...state,
        [index]: stats,
      }
    })
  }, [])

  const deleteMealStats = useCallback((index: number) => {
    setState(state => {
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

  const derivedState = useMemo(() => {
    const mealsStats = Object.values(state)

    return {
      mealsStatsSum: sumStats(mealsStats),
    }
  }, [state])

  return tuple(derivedState, methods)
}

type MealsStatsStore = ReturnType<typeof useMealsStatsStore>

export type { MealsStatsStore }

export default useMealsStatsStore
