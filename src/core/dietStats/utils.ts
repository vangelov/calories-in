import { Stats } from './types'

function sumStats(stats: Stats[]): Stats {
  const result = { protein: 0 }

  for (const { protein } of stats) {
    result.protein += protein
  }

  return result
}

export { sumStats }
