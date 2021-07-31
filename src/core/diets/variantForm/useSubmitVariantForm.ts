import { useFormContext } from 'react-hook-form'
import { VariantForm } from './index'
import { useDietFormActions } from '../useDietFormStore'

type VariantNameFormSubmitAction = 'rename' | 'copy' | 'append'

type Params = {
  onComplete: (variantForm: VariantForm) => void
  variantFormIndex?: number
  submitAction: VariantNameFormSubmitAction
}

function useSubmitVariantForm({
  onComplete,
  variantFormIndex,
  submitAction,
}: Params) {
  const dietFormActions = useDietFormActions()
  const { handleSubmit } = useFormContext()

  const onSubmit = handleSubmit((form: VariantForm) => {
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

export default useSubmitVariantForm
