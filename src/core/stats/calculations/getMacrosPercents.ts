import { Stats } from '../types'

type MacrosPercents = {
  proteinPercent: number
  carbsPercent: number
  fatPercent: number
}

const CALORIES_PER_GRAM_PROTEIN = 4
const CALORIES_PER_GRAM_CARBS = 4
const CALORIES_PER_GRAM_FAT = 9

function getMacroEnergyPercent(energyFromMacro: number, energyTotal: number) {
  return energyFromMacro === 0 ? 0 : (energyFromMacro / energyTotal) * 100
}

function getMacrosPercents(stats: Stats): MacrosPercents {
  const { protein, carbs, fat } = stats

  const energyFromProtein = protein * CALORIES_PER_GRAM_PROTEIN
  const energyFromCarbs = carbs * CALORIES_PER_GRAM_CARBS
  const energyFromFat = fat * CALORIES_PER_GRAM_FAT
  const energyTotal = energyFromProtein + energyFromCarbs + energyFromFat

  return {
    proteinPercent: getMacroEnergyPercent(energyFromProtein, energyTotal),
    carbsPercent: getMacroEnergyPercent(energyFromCarbs, energyTotal),
    fatPercent: getMacroEnergyPercent(energyFromFat, energyTotal),
  }
}

export type { MacrosPercents }

export default getMacrosPercents
