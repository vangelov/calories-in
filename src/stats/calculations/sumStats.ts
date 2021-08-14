import { objectFromNutritionDataKeys, NUTRITION_STATS_KEYS } from 'stats'
import { Stats } from '../types'

function sumStats(stats: Stats[]): Stats {
  const result: Stats = {
    amountInGrams: 0,
    ...objectFromNutritionDataKeys(key => 0),
  }

  for (const stat of stats) {
    result.amountInGrams += stat.amountInGrams

    for (const key of NUTRITION_STATS_KEYS) {
      result[key] += stat[key]
    }
  }

  return result
}

export default sumStats
