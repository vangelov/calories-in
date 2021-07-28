import { VariantForm } from 'core/diets'
import { useMemo, useRef } from 'react'
import getMacrosPercentages, {
  roundedMacroPercentages,
} from './getMacrosPercentages'
import sumStats from './sumStats'
import { useMealsStats } from './useMealsStatsStore'

type Params = {
  selectedVariantForm: VariantForm
}

function useDerivedMealsStats({ selectedVariantForm }: Params) {
  const mealsStats = useMealsStats()
  const energyCacheRef = useRef<Record<string, number | undefined>>({})
  const { fieldId } = selectedVariantForm

  const mealsStatsSum = useMemo(() => {
    const variantStats = mealsStats[fieldId]
    const stats = variantStats ? Object.values(variantStats) : []
    const statsSum = sumStats(stats)

    if (variantStats && energyCacheRef.current[fieldId] === undefined) {
      energyCacheRef.current[fieldId] = statsSum.energy
    }

    return statsSum
  }, [mealsStats, fieldId])

  const { proteinPercentage, carbsPercentage, fatPercentage } = useMemo(
    () => roundedMacroPercentages(getMacrosPercentages(mealsStatsSum)),
    [mealsStatsSum]
  )

  const cachedEnergy = energyCacheRef.current[selectedVariantForm.fieldId]
  const diff =
    cachedEnergy !== undefined && cachedEnergy > 0
      ? mealsStatsSum.energy - cachedEnergy
      : 0

  return {
    mealsStatsSum,
    proteinPercentage,
    carbsPercentage,
    fatPercentage,
    diff,
  }
}

export default useDerivedMealsStats
