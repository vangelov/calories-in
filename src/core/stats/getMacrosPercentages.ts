import { Stats } from './types'

type MacroPercentages = {
  proteinPercentage: number
  carbsPercentage: number
  fatPercentage: number
}

function getMacrosPercentages(stats: Stats): MacroPercentages {
  const { protein, carbs, fat } = stats

  const energyFromProtein = protein * 4
  const energyFromCarbs = carbs * 4
  const energyFromFat = fat * 9
  const e = energyFromProtein + energyFromCarbs + energyFromFat

  return {
    proteinPercentage:
      energyFromProtein === 0 ? 0 : (energyFromProtein / e) * 100,
    carbsPercentage: energyFromCarbs === 0 ? 0 : (energyFromCarbs / e) * 100,
    fatPercentage: energyFromFat === 0 ? 0 : (energyFromFat / e) * 100,
  }
}

type RoundPercentageValue = {
  value: number
  type: 'protein' | 'fat' | 'carbs'
}

function roundedMacroPercentages(
  percentanges: MacroPercentages
): MacroPercentages {
  const { proteinPercentage, carbsPercentage, fatPercentage } = percentanges

  if (proteinPercentage === 0 && carbsPercentage === 0 && fatPercentage === 0) {
    return percentanges
  }
  const values: RoundPercentageValue[] = [
    { value: proteinPercentage, type: 'protein' },
    { value: carbsPercentage, type: 'carbs' },
    { value: fatPercentage, type: 'fat' },
  ]

  const diff =
    100 -
    values
      .map(p => ({ ...p, value: Math.floor(p.value) }))
      .reduce((acc, value) => value.value + acc, 0)

  const roundedPercentages = values
    .sort(x => x.value - Math.floor(x.value))
    .map((x, index) =>
      index < diff
        ? { ...x, value: Math.floor(x.value) + 1 }
        : { ...x, value: Math.floor(x.value) }
    )

  console.log('r', roundedPercentages)

  let p = 0,
    c = 0,
    f = 0

  for (const x of roundedPercentages) {
    if (x.type === 'protein') {
      p = x.value
    } else if (x.type === 'carbs') {
      c = x.value
    } else {
      f = x.value
    }
  }

  return {
    proteinPercentage: p,
    carbsPercentage: c,
    fatPercentage: f,
  }
}

export { roundedMacroPercentages }

export default getMacrosPercentages
