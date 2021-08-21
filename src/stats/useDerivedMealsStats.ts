import { useMemo, useRef } from 'react'
import { getMacrosPercents, roundMacrosPercents } from './calculations'
import sumStats from './calculations/sumStats'
import { useMealsStats } from './useMealsStatsStore'

type Params = {
  variantFormFieldId: string
}

function useDerivedMealsStats({ variantFormFieldId }: Params) {
  const mealsStats = useMealsStats()
  const energyCacheRef = useRef<Record<string, number | undefined>>({})

  const mealsStatsSum = useMemo(() => {
    const mealsStatsForVariant = mealsStats[variantFormFieldId]
    const finalStats = mealsStatsForVariant
      ? Object.values(mealsStatsForVariant)
      : []
    const statsSum = sumStats(finalStats)

    if (
      mealsStatsForVariant &&
      energyCacheRef.current[variantFormFieldId] === undefined
    ) {
      energyCacheRef.current[variantFormFieldId] = statsSum.energy
    }

    return statsSum
  }, [mealsStats, variantFormFieldId])

  const { proteinPercent, carbsPercent, fatPercent } = useMemo(
    () => roundMacrosPercents(getMacrosPercents(mealsStatsSum)),
    [mealsStatsSum]
  )

  const cachedEnergy = energyCacheRef.current[variantFormFieldId]
  const energyDiff =
    cachedEnergy !== undefined && cachedEnergy > 0
      ? mealsStatsSum.energy - cachedEnergy
      : 0

  return {
    mealsStatsSum,
    proteinPercent,
    carbsPercent,
    fatPercent,
    energyDiff,
  }
}

export default useDerivedMealsStats
