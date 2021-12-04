import { VariantForm } from 'variants'
import { object, string } from 'yup'

type VariantNameForm = {
  name: string
}

function getVariantNameForm(name: string): VariantNameForm {
  return {
    name,
  }
}

type VariantNameFormSchemaContext = {
  variantsForms: VariantForm[]
  variantForm?: VariantForm
}

const variantNameFormSchema = object().shape({
  name: string()
    .required('Please add a name')
    .test(
      'uniqueName',
      'This name has already been used',
      (currentName, { options }) => {
        if (currentName === undefined) {
          return true
        }

        const {
          variantsForms,
          variantForm,
        } = options.context as VariantNameFormSchemaContext

        const sameVariantFormExists = variantsForms.some(
          ({ name, fieldId }) => {
            const haveSameNames =
              currentName.toLowerCase() === name.toLowerCase()
            return variantForm
              ? fieldId !== variantForm.fieldId && haveSameNames
              : haveSameNames
          }
        )

        return !sameVariantFormExists
      }
    ),
})

export { getVariantNameForm, variantNameFormSchema }

export type { VariantNameForm, VariantNameFormSchemaContext }
