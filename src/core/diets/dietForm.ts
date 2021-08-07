import { Diet } from 'core/types'
import { getVariantForm, VariantForm } from './variantForm'

type DietForm = {
  formId: string
  name: string
  selectedVariantFormIndex: number
  variantsForms: VariantForm[]
}

function getDietForm(diet?: Diet): DietForm {
  const variantsForms = [
    getVariantForm('Variant 1'),
    getVariantForm('Variant 2'),
    getVariantForm('Variant 3'),
    getVariantForm('Variant 4'),
    getVariantForm('Variant 5'),
    getVariantForm('Variant 6'),
    getVariantForm('Variant 7'),
    getVariantForm('Variant 8'),
    getVariantForm('Variant 9'),
    getVariantForm('Variant 10'),
    getVariantForm('Variant 11'),
    getVariantForm('Variant 12'),
    getVariantForm('Variant 13'),
    getVariantForm('Variant 14'),
    getVariantForm('Variant 15'),
    getVariantForm('Variant 16'),
  ]

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
