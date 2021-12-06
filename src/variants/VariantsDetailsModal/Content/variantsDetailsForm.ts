import {
  getFatEnergyEstimate,
  getMacroEnergyPercent,
  getStatsEnergiesEstimates,
  MappedNutritionData,
  objectFromNutritionDataKeys,
  Stats,
} from 'stats'

type VariantsDetailsForm = {
  variantFormFieldId: string
  saturatedFatEnergyPercent: string
} & MappedNutritionData<string>

function getVariantsDetailsForm(
  variantFormFieldId: string,
  variantStats: Stats
) {
  const { saturatedFat } = variantStats
  const saturatedFatEnergyEstimate = getFatEnergyEstimate(saturatedFat)
  const { energyEstimate } = getStatsEnergiesEstimates(variantStats)

  return {
    variantFormFieldId,
    saturatedFatEnergyPercent: Math.round(
      getMacroEnergyPercent(saturatedFatEnergyEstimate, energyEstimate)
    ).toString(),
    ...objectFromNutritionDataKeys(key => variantStats[key].toString()),
  }
}

export type { VariantsDetailsForm }

export { getVariantsDetailsForm }
