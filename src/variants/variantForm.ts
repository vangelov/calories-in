import { MealForm } from 'meals'
import { v4 as uuidv4 } from 'uuid'
import deepCopy from 'general/deepCopy'

type VariantForm = {
  fieldId: string
  name: string
  mealsForms: MealForm[]
}

function getVariantForm(name: string): VariantForm {
  const fieldId = uuidv4()

  return {
    fieldId,
    name,
    mealsForms: [],
  }
}

function getInsertVariantFormAnimationKey(fieldId: string) {
  return `insert-variant-animmation-${fieldId}`
}

function duplicate(originalVariantForm: VariantForm) {
  const copiedVariantForm = deepCopy(
    originalVariantForm,
    (key: string, value: any) => {
      if (key === 'fieldId') {
        return uuidv4()
      }

      return value
    }
  ) as VariantForm

  return copiedVariantForm
}

export type { VariantForm }

export { getVariantForm, getInsertVariantFormAnimationKey, duplicate }
