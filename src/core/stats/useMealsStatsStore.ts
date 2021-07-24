import { Stats } from './types'
import { useState, useCallback } from 'react'
import produce from 'immer'
import { makeStoreProvider, useCallbacksMemo } from 'general/stores'

function useMealsStatsStore() {
  const [mealsStats, setMealsStats] = useState<Record<number, Stats>>({})

  const setMealStats = useCallback(
    (index: number, stats: Stats) =>
      setMealsStats(
        produce(draftMealsStats => {
          draftMealsStats[index] = stats
        })
      ),
    []
  )

  const deleteMealStats = useCallback(
    (index: number) =>
      setMealsStats(
        produce(draftMealsStats => {
          delete draftMealsStats[index]
        })
      ),
    []
  )

  const actions = useCallbacksMemo({ setMealStats, deleteMealStats })

  return [mealsStats, actions] as const
}

const [
  MealsStatsStoreProvider,
  useMealsStats,
  useMealsStatsActions,
] = makeStoreProvider(useMealsStatsStore)

export { MealsStatsStoreProvider, useMealsStatsActions, useMealsStats }

export default useMealsStatsStore
