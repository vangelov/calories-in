import { Stats } from './types'
import { useState, useCallback } from 'react'
import produce from 'immer'
import { makeStoreProvider, useCallbacksMemo } from 'general'

type MealsStats = Record<string, Record<number, Stats> | undefined>

function useMealsStatsStore() {
  const [mealsStats, setMealsStats] = useState<MealsStats>({})

  const setMealStats = useCallback(
    (variantFormFieldId: string, index: number, stats: Stats) =>
      setMealsStats(
        produce(draftMealsStats => {
          let variantMealsStats = draftMealsStats[variantFormFieldId]

          if (!variantMealsStats) {
            variantMealsStats = {}
            draftMealsStats[variantFormFieldId] = variantMealsStats
          }

          variantMealsStats[index] = stats
        })
      ),
    []
  )

  const deleteMealStats = useCallback(
    (variantFormFieldId: string, index: number) =>
      setMealsStats(
        produce(draftMealsStats => {
          let variantMealsStats = draftMealsStats[variantFormFieldId]

          if (variantMealsStats) {
            delete variantMealsStats[index]
          }
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
