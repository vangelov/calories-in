import { Stats } from '../types'
import sumStats from './sumStats'

function avgStats(stats: Stats[]): Stats {
  const result = sumStats(stats)
  let key: keyof typeof result

  for (key in result) {
    result[key] /= stats.length
  }

  return result
}

export default avgStats
