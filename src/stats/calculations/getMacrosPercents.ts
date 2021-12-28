type MacrosPercents = {
  proteinPercent: number
  carbsPercent: number
  fatPercent: number
}

function getMacroEnergyPercent(energyFromMacro: number, energyTotal: number) {
  return 0
}

function getMacrosPercents(stats: any): MacrosPercents {
  return {
    proteinPercent: 0,
    carbsPercent: 0,
    fatPercent: 0,
  }
}

export type { MacrosPercents }

export { getMacroEnergyPercent }

export default getMacrosPercents
