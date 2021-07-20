import { useFormContext } from 'react-hook-form'
import { VariantForm } from '../variants'
import { useDietFormActions } from '../DietFormStoreProvider'

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
    console.log('submit', form, submitAction)
    onComplete(form)

    if (submitAction === 'append') {
      dietFormActions.appendVariantForm(form)
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
