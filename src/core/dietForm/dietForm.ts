import { Diet } from 'core/types'
import { useForm } from 'react-hook-form'
import { getVariantForm, VariantForm } from './variantForm'

type DietForm = {
  formId: string
  name: string
  selectedVariantFieldId: string
  variantsForms: VariantForm[]
}

function getDietForm(diet?: Diet): DietForm {
  const variantsForms = [getVariantForm(), getVariantForm()]

  if (diet) {
    return {
      formId: diet.id.toString(),
      name: diet.name,
      variantsForms,
      selectedVariantFieldId: variantsForms[0].fieldId,
    }
  }

  return {
    formId: Math.random().toString(),
    name: '',
    variantsForms,
    selectedVariantFieldId: variantsForms[0].fieldId,
  }
}

function useDietForm(dietForm: DietForm) {
  const formMethods = useForm<DietForm>({
    defaultValues: dietForm,
  })

  return formMethods
}

export type { DietForm }

export { getDietForm, useDietForm }

export * from './mealForm'
export * from './ingredientForm'
