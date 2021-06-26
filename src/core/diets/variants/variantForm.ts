import { getMealForm, MealForm } from '../meals/mealForm'
import { v4 as uuidv4 } from 'uuid'
import { getFormPath } from '../utils'

type VariantForm = {
  fieldId: string
  name: string
  mealsForms: MealForm[]
}

function getVariantForm(name: string): VariantForm {
  const fieldId = uuidv4()
  const firstMeal = getMealForm()

  return {
    fieldId,
    name,
    mealsForms: [firstMeal],
  }
}

type VariantField = Partial<VariantForm>

function getVariantsFormsPath(index?: number, fieldName?: string): string {
  return getFormPath('variantsForms', index, fieldName)
}

function getInsertVariantFormAnimationKey(fieldId: string) {
  return `insert-variant-animmation-${fieldId}`
}

export type { VariantForm, VariantField }

export {
  getVariantForm,
  getVariantsFormsPath,
  getInsertVariantFormAnimationKey,
}
