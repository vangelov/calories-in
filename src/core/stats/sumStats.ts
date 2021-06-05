import { Stats } from './types'

function sumStats(stats: Stats[]): Stats {
  const result: Stats = {
    energy: 0,
    protein: 0,
    amountInGrams: 0,
    carbs: 0,
    fat: 0,
    saturatedFat: 0,
    sugar: 0,
    sodium: 0,
    fiber: 0,
  }

  for (const { amountInGrams, energy, protein, carbs, fat } of stats) {
    result.amountInGrams += amountInGrams
    result.energy += energy
    result.protein += protein
    result.carbs += carbs
    result.fat += fat
  }

  return result
}

export default sumStats
