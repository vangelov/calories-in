import { Stats } from 'stats/types'

const CALORIES_PER_GRAM_PROTEIN = 4
const CALORIES_PER_GRAM_CARBS = 4
const CALORIES_PER_GRAM_FAT = 9

function getProteinEnergyEstimate(gramsProtein: number) {
  return gramsProtein * CALORIES_PER_GRAM_PROTEIN
}

function getCarbsEnergyEstimate(gramsCarbs: number) {
  return gramsCarbs * CALORIES_PER_GRAM_CARBS
}

function getFatEnergyEstimate(gramsFat: number) {
  return gramsFat * CALORIES_PER_GRAM_FAT
}

function getStatsEnergiesEstimates(stats: Stats) {
  const { protein, carbs, fat } = stats

  const proteinEnergyEstimate = getProteinEnergyEstimate(protein)
  const carbsEnergyEstimate = getCarbsEnergyEstimate(carbs)
  const fatEnergyEstimate = getFatEnergyEstimate(fat)

  const energyEstimate =
    proteinEnergyEstimate + carbsEnergyEstimate + fatEnergyEstimate

  return {
    energyEstimate,
    proteinEnergyEstimate,
    carbsEnergyEstimate,
    fatEnergyEstimate,
  }
}

export {
  getProteinEnergyEstimate,
  getCarbsEnergyEstimate,
  getFatEnergyEstimate,
  getStatsEnergiesEstimates,
}
