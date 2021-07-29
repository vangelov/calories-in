import { MacrosPercents } from './getMacrosPercents'

type RoundedMacroPercent = {
  value: number
  type: 'protein' | 'fat' | 'carbs'
}

function getDiff(macroPercents: MacrosPercents) {
  return (
    100 -
    Object.values(macroPercents)
      .map(percent => Math.floor(percent))
      .reduce((sumSoFar, percent) => percent + sumSoFar, 0)
  )
}

function getRoundedMacroPercents(
  macroPercents: MacrosPercents,
  diff: number
): RoundedMacroPercent[] {
  const { proteinPercent, carbsPercent, fatPercent } = macroPercents

  const initialRoundedMacroPercents: RoundedMacroPercent[] = [
    { value: proteinPercent, type: 'protein' },
    { value: carbsPercent, type: 'carbs' },
    { value: fatPercent, type: 'fat' },
  ]

  return initialRoundedMacroPercents
    .sort(({ value }) => value - Math.floor(value))
    .map(({ value, type }, index) =>
      index < diff
        ? {
            type,
            value: Math.floor(value) + 1,
          }
        : {
            type,
            value: Math.floor(value),
          }
    )
}

function getMacrosPercents(
  roundedMacroPercents: RoundedMacroPercent[]
): MacrosPercents {
  let roundedProteinPercent = 0
  let roundedCarbsPercent = 0
  let roundedFatPercent = 0

  for (const { type, value } of roundedMacroPercents) {
    if (type === 'protein') {
      roundedProteinPercent = value
    } else if (type === 'carbs') {
      roundedCarbsPercent = value
    } else {
      roundedFatPercent = value
    }
  }

  return {
    proteinPercent: roundedProteinPercent,
    carbsPercent: roundedCarbsPercent,
    fatPercent: roundedFatPercent,
  }
}

function roundMacrosPercents(macroPercents: MacrosPercents): MacrosPercents {
  const { proteinPercent, carbsPercent, fatPercent } = macroPercents

  if (proteinPercent === 0 && carbsPercent === 0 && fatPercent === 0) {
    return macroPercents
  }

  const diff = getDiff(macroPercents)
  const roundedMacroPercents = getRoundedMacroPercents(macroPercents, diff)

  return getMacrosPercents(roundedMacroPercents)
}

export default roundMacrosPercents
