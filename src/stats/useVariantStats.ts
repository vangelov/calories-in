import { useMemo, useRef } from 'react'
import { getMacrosPercents, roundMacrosPercents } from './calculations'
import { sumStats } from 'stats'
import { useMealsStats } from './useMealsStatsStore'
import { useDietForm } from 'diets'

type Params = {
  variantFormFieldId: string
}

function useVariantStats({ variantFormFieldId }: Params) {
  const mealsStats = useMealsStats()
  const dietForm = useDietForm()
  const energyCacheRef = useRef<Record<string, number | undefined>>({})

  const variantStats = useMemo(() => {
    const mealsStatsForVariant = mealsStats[variantFormFieldId]
    const finalStats = mealsStatsForVariant
      ? Object.values(mealsStatsForVariant)
      : []
    const statsSum = sumStats(finalStats)

    const variantForm = dietForm.variantsForms.find(
      ({ fieldId }) => fieldId === variantFormFieldId
    )

    if (variantForm && variantForm.mealsForms.length === 0) {
      energyCacheRef.current[variantFormFieldId] = 0
    } else if (
      mealsStatsForVariant &&
      energyCacheRef.current[variantFormFieldId] === undefined
    ) {
      energyCacheRef.current[variantFormFieldId] = statsSum.energy
    }

    return statsSum
  }, [mealsStats, variantFormFieldId, dietForm])

  const { proteinPercent, carbsPercent, fatPercent } = useMemo(
    () => roundMacrosPercents(getMacrosPercents(variantStats)),
    [variantStats]
  )

  const cachedEnergy = energyCacheRef.current[variantFormFieldId]
  const energyDiff =
    cachedEnergy !== undefined && cachedEnergy > 0
      ? variantStats.energy - cachedEnergy
      : 0

  return {
    variantStats,
    proteinPercent,
    carbsPercent,
    fatPercent,
    energyDiff,
  }
}

export default useVariantStats
