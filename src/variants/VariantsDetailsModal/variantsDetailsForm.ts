import { MappedNutritionData, objectFromNutritionDataKeys, Stats } from 'stats'

type VariantsDetailsForm = {
  variantFormFieldId: string
} & MappedNutritionData<string>

function getVariantsDetailsForm(
  variantFormFieldId: string,
  variantStats: Stats
) {
  return {
    variantFormFieldId,
    ...objectFromNutritionDataKeys(key => variantStats[key].toString()),
  }
}

export type { VariantsDetailsForm }

export { getVariantsDetailsForm }
