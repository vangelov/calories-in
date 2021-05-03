import { Stats } from './types'

function sumStats(stats: Stats[]): Stats {
  const result = { protein: 0, amountInGrams: 0 }

  for (const { protein, amountInGrams } of stats) {
    result.protein += protein
    result.amountInGrams += amountInGrams
  }

  return result
}

export { sumStats }
