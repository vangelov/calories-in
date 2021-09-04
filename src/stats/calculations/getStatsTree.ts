import { sumStats, avgStats } from './aggregateStats'
import { Stats } from '../types'

type StatsTree = {
  id: string
  stats: Stats
  avg?: Stats
  subtrees: StatsTree[]
}

type Params = {
  id: string
  subtrees: StatsTree[]
  calculateAvg?: boolean
}

function getStatsTree({ id, subtrees, calculateAvg = false }: Params) {
  const subtreesStats = subtrees.map(({ stats }) => stats)

  const result: StatsTree = {
    id,
    stats: sumStats(subtreesStats),
    subtrees,
  }

  if (calculateAvg) {
    result.avg = avgStats(subtreesStats)
  }

  return result
}

export type { StatsTree }

export default getStatsTree
