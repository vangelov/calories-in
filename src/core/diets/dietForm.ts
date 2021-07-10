import { Diet } from 'core/types'
import { getVariantForm, VariantForm } from './variants'

type DietForm = {
  formId: string
  name: string
  selectedVariantFormIndex: number
  variantsForms: VariantForm[]
}

function getDietForm(diet?: Diet): DietForm {
  const variantsForms = [getVariantForm('Every day')]

  if (diet) {
    return {
      formId: diet.id.toString(),
      name: diet.name,
      variantsForms,
      selectedVariantFormIndex: 0,
    }
  }

  return {
    formId: Math.random().toString(),
    name: '',
    variantsForms,
    selectedVariantFormIndex: 0,
  }
}

export type { DietForm }

export { getDietForm }
