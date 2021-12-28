import { Stats } from '../types'
import { getStatsEnergiesEstimates } from './getEnergiesEstimates'

type MacrosPercents = {
  proteinPercent: number
  carbsPercent: number
  fatPercent: number
}

function getMacroEnergyPercent(energyFromMacro: number, energyTotal: number) {
  return energyFromMacro === 0 ? 0 : (energyFromMacro / energyTotal) * 100
}

function getMacrosPercents(stats: Stats): MacrosPercents {
  const {
    energyEstimate,
    proteinEnergyEstimate,
    carbsEnergyEstimate,
    fatEnergyEstimate,
  } = getStatsEnergiesEstimates(stats)

  return {
    proteinPercent: getMacroEnergyPercent(
      proteinEnergyEstimate,
      energyEstimate
    ),
    carbsPercent: getMacroEnergyPercent(carbsEnergyEstimate, energyEstimate),
    fatPercent: getMacroEnergyPercent(fatEnergyEstimate, energyEstimate),
  }
}

export type { MacrosPercents }

export { getMacroEnergyPercent }

export default getMacrosPercents
