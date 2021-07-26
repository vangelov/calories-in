import { VariantForm } from 'core/diets'
import { useEffect, useMemo, useRef } from 'react'
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
  const ref = useRef<Record<string, number | undefined>>({})

  const mealsStatsSum = useMemo(() => sumStats(Object.values(mealsStats)), [
    mealsStats,
  ])

  const { proteinPercentage, carbsPercentage, fatPercentage } = useMemo(
    () => roundedMacroPercentages(getMacrosPercentages(mealsStatsSum)),
    [mealsStatsSum]
  )

  const t = ref.current[selectedVariantForm.fieldId]

  if (t === undefined) {
    ref.current[selectedVariantForm.fieldId] = mealsStatsSum.energy
  }

  console.log('E', mealsStatsSum.energy)
  let diff = 0

  if (t !== undefined && t > 0) {
    diff = mealsStatsSum.energy - t
  }

  return {
    mealsStatsSum,
    proteinPercentage,
    carbsPercentage,
    fatPercentage,
    diff,
  }
}

export default useDerivedMealsStats
