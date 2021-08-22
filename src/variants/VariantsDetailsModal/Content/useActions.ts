import { useFormContext, useWatch } from 'react-hook-form'
import { getVariantsDetailsForm } from '../variantsDetailsForm'
import { VariantsFormsExtendedStats } from 'stats'

type Params = {
  variantsFormsExtendedStats: VariantsFormsExtendedStats
}

function useActions({ variantsFormsExtendedStats }: Params) {
  const { reset } = useFormContext()
  const variantFormFieldId = useWatch({ name: 'variantFormFieldId' })

  function getVariantStatsForForFieldId(value: string) {
    const {
      avgVariantsFormsStats,
      variantsFormsStatsMap,
    } = variantsFormsExtendedStats

    return value ? variantsFormsStatsMap[value] : avgVariantsFormsStats
  }

  const variantStats = getVariantStatsForForFieldId(variantFormFieldId)

  function onVariantFormFieldIdChange(value: string) {
    const variantStats = getVariantStatsForForFieldId(value)
    const newVaraintsDetailsForm = getVariantsDetailsForm(value, variantStats)
    reset(newVaraintsDetailsForm)
  }

  return { onVariantFormFieldIdChange, variantStats }
}

export default useActions
