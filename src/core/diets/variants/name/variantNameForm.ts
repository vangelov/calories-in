import { object, string } from 'yup'
import { VariantField } from '../variantForm'

type VariantNameForm = {
  name: string
}

function getVariantNameForm(variantField?: VariantField) {
  if (variantField) {
    return {
      name: variantField.name,
    }
  }

  return {
    name: '',
  }
}

const variantNameFormSchema = object().shape({
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

export { variantNameFormSchema, getVariantNameForm }

export type { VariantNameForm }
