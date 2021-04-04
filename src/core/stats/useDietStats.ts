import { sumStats } from './utils'
import { useDietStatsState } from './DietStatsProvider'
import { Stats } from './types'

function useDietStats(): Stats {
  const state = useDietStatsState()

  const mealsStats = Object.values(state)

  return sumStats(mealsStats)
}

export default useDietStats
