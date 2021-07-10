import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DietForm } from './dietForm'

type Props = {
  dietForm: DietForm
  children: ReactNode
}

function DietFormProvider({ dietForm, children }: Props) {
  const formMethods = useForm<DietForm>({
    defaultValues: dietForm,
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default DietFormProvider
