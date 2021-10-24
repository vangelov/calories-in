import { useFormContext, useWatch } from 'react-hook-form'
import { getVariantsDetailsForm } from './variantsDetailsForm'
import { Stats, StatsTree } from 'stats'

type Params = {
  dietFormStatsTree: StatsTree
}

function useVariantFormEvents({ dietFormStatsTree }: Params) {
  const { reset } = useFormContext()
  const variantFormFieldId = useWatch({ name: 'variantFormFieldId' })

  function getVariantStatsForForFieldId(value: string) {
    if (value) {
      const stats = dietFormStatsTree.subtrees.find(({ id }) => id === value)

      if (!stats) {
        throw new Error()
      }

      return stats.stats
    }

    return dietFormStatsTree.avg as Stats
  }

  const variantStats = getVariantStatsForForFieldId(variantFormFieldId)

  function onVariantFormFieldIdChange(value: string) {
    const variantStats = getVariantStatsForForFieldId(value)
    const newVaraintsDetailsForm = getVariantsDetailsForm(value, variantStats)
    reset(newVaraintsDetailsForm)
  }

  return { onVariantFormFieldIdChange, variantStats }
}

export default useVariantFormEvents
