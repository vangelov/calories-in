import { MappedNutritionData, objectFromNutritionDataKeys, Stats } from 'stats'

type VariantsDetailsForm = {
  variantFormFieldId?: string
} & MappedNutritionData<string>

function getVariantsDetailsForm(
  variantFormFieldId: string | undefined,
  mealsStatsSum: Stats
) {
  return {
    variantFormFieldId,
    ...objectFromNutritionDataKeys(key => mealsStatsSum[key].toString()),
  }
}

export type { VariantsDetailsForm }

export { getVariantsDetailsForm }
