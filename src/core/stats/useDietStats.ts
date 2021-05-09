import sumStats from './sumStats'
import { useDietStatsState } from './DietStatsProvider'
import { useInitialEnergySetState } from './InitialEnergyProvider'

function useDietStats() {
  const state = useDietStatsState()
  const initialEnergySetState = useInitialEnergySetState()

  const mealsStats = Object.values(state)
  const dietStats = sumStats(mealsStats)

  initialEnergySetState(dietStats.amountInGrams * 10)

  return dietStats
}

export default useDietStats
