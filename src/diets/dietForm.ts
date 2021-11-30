import { Diet } from 'diets'
import { getVariantForm, VariantForm } from 'variants'
import { v4 as uuidv4 } from 'uuid'

type DietForm = {
  fieldId: string
  name: string
  selectedVariantFormIndex: number
  variantsForms: VariantForm[]
}

function getDietForm(diet?: Diet): DietForm {
  const variantsForms = [getVariantForm('Day 1')]
  const fieldId = uuidv4()

  if (diet) {
    return {
      fieldId,
      name: diet.name,
      variantsForms,
      selectedVariantFormIndex: 0,
    }
  }

  return {
    fieldId,
    name: 'Untitled',
    variantsForms,
    selectedVariantFormIndex: 0,
  }
}

export type { DietForm }

export { getDietForm }
