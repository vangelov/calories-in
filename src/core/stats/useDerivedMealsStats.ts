import { useMemo } from 'react'
import getMacrosPercentages, {
  roundedMacroPercentages,
} from './getMacrosPercentages'
import sumStats from './sumStats'
import { useMealsStats } from './useMealsStatsStore'

function useDerivedMealsStats() {
  const mealsStats = useMealsStats()

  const mealsStatsSum = useMemo(() => sumStats(Object.values(mealsStats)), [
    mealsStats,
  ])

  const { proteinPercentage, carbsPercentage, fatPercentage } = useMemo(
    () => roundedMacroPercentages(getMacrosPercentages(mealsStatsSum)),
    [mealsStatsSum]
  )

  return {
    mealsStatsSum,
    proteinPercentage,
    carbsPercentage,
    fatPercentage,
  }
}

export default useDerivedMealsStats
