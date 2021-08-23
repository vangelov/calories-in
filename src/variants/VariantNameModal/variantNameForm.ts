import { object, string } from 'yup'

type VariantNameForm = {
  name: string
}

function getVariantNameForm(name: string): VariantNameForm {
  return {
    name,
  }
}

const variantNameFormSchema = object().shape({
  name: string()
    .required('Please add a name')
    .test(
      'uniqueName',
      'This name has alredy been used',
      (name, { options }) => {
        const variantsFormsNames = options.context as string[]

        return (
          name !== undefined &&
          !variantsFormsNames.includes(name.toLocaleLowerCase())
        )
      }
    ),
})

export { getVariantNameForm, variantNameFormSchema }

export type { VariantNameForm }
