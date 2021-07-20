import { getMealForm, MealForm } from '../meals/mealForm'
import { v4 as uuidv4 } from 'uuid'
import { getFormPath } from '../utils'
import { object, string } from 'yup'

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

const variantFormSchema = object().shape({
  name: string()
    .required('Please add a name')
    .test('uniq', 'This name has alredy been used', (name, meta) => {
      const variantsFields = meta.options.context as VariantField[]

      if (variantsFields) {
        const variantsNames = variantsFields.map(({ name }) =>
          name?.toLocaleLowerCase()
        )
        return !variantsNames.includes(name?.toLocaleLowerCase())
      }

      return true
    }),
})

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
  variantFormSchema,
}
