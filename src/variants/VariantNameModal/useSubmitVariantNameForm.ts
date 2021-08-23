import { useFormContext } from 'react-hook-form'
import { VariantNameForm } from './variantNameForm'
import { useDietFormActions } from 'diets'

type VariantNameFormSubmitAction = 'rename' | 'copy' | 'append'

type Params = {
  onComplete: (variantNameForm: VariantNameForm) => void
  variantFormIndex?: number
  submitAction: VariantNameFormSubmitAction
}

function useSubmitVariantNameForm({
  onComplete,
  variantFormIndex,
  submitAction,
}: Params) {
  const dietFormActions = useDietFormActions()
  const { handleSubmit } = useFormContext()

  const onSubmit = handleSubmit((form: VariantNameForm) => {
    onComplete(form)

    if (submitAction === 'append') {
      dietFormActions.appendVariantForm({ name: form.name })
    } else if (variantFormIndex !== undefined) {
      if (submitAction === 'copy') {
        dietFormActions.duplicateVariantForm(variantFormIndex, {
          name: form.name,
        })
      } else if (submitAction === 'rename') {
        dietFormActions.updateVariantForm(variantFormIndex, { name: form.name })
      }
    }
  })

  return onSubmit
}

export type { VariantNameFormSubmitAction }

export default useSubmitVariantNameForm
