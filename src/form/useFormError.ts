import { useFormContext } from 'react-hook-form'

function useFormError(name: string) {
  const { formState } = useFormContext()
  const { errors, touchedFields } = formState

  const isInvalid =
    errors[name] && (touchedFields[name] || formState.isSubmitted)

  const errorMessage = isInvalid ? errors[name]?.message : undefined

  return {
    isInvalid,
    errorMessage,
  }
}

export default useFormError
