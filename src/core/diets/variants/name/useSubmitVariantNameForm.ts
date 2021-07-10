import { useFormContext } from 'react-hook-form'
import {
  useVariantsFormsStoreMethods,
  VariantField,
  VariantNameForm,
} from 'core/diets'

type VariantNameFormSubmitAction = 'rename' | 'copy' | 'append'

type Params = {
  onComplete: () => void
  variantField?: VariantField
  submitAction: VariantNameFormSubmitAction
}

function useSubmitVariantNameForm({
  onComplete,
  variantField,
  submitAction,
}: Params) {
  const variantsFormsStoreMethods = useVariantsFormsStoreMethods()
  const { handleSubmit } = useFormContext()

  const onSubmit = handleSubmit((form: VariantNameForm) => {
    console.log('submit', form)
    onComplete()

    if (submitAction === 'append') {
      variantsFormsStoreMethods.appendVariantForm(form.name)
    } else if (variantField) {
      if (submitAction === 'copy') {
        variantsFormsStoreMethods.cloneVariantForm(
          form.name,
          variantField.fieldId as string
        )
      } else if (submitAction === 'rename') {
        variantsFormsStoreMethods.renameVariantForm(
          form.name,
          variantField.fieldId as string
        )
      }
    }
  })

  return onSubmit
}

export type { VariantNameFormSubmitAction }

export default useSubmitVariantNameForm
