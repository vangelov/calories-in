import { MealForm } from 'meals'
import { v4 as uuidv4 } from 'uuid'

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

export type { VariantForm }

export { getVariantForm, getInsertVariantFormAnimationKey }
