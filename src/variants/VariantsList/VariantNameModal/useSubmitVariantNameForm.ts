import { useFormContext } from 'react-hook-form'
import { VariantNameForm } from './variantNameForm'
import { useDietFormActions } from 'diets'

type Params = {
  onComplete: (variantNameForm: VariantNameForm) => void
  variantFormIndex: number
}

function useSubmitVariantNameForm({ onComplete, variantFormIndex }: Params) {
  const dietFormActions = useDietFormActions()
  const { handleSubmit } = useFormContext()

  const onSubmit = handleSubmit((form: VariantNameForm) => {
    onComplete(form)

    dietFormActions.updateVariantForm(variantFormIndex, { name: form.name })
  })

  return onSubmit
}

export default useSubmitVariantNameForm
