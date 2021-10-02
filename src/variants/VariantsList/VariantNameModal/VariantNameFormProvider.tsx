import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactNode } from 'react'
import { useDietForm } from 'diets'
import {
  getVariantNameForm,
  VariantNameForm,
  variantNameFormSchema,
} from './variantNameForm'
import { VariantNameFormSchemaContext } from './variantNameForm'

type Props = {
  children: ReactNode
  variantFormIndex?: number
}

function VariantNameFormProvider({ children, variantFormIndex }: Props) {
  const dietForm = useDietForm()
  const { variantsForms } = dietForm
  const variantForm =
    variantFormIndex !== undefined ? variantsForms[variantFormIndex] : undefined

  const defaultValues = getVariantNameForm(
    variantFormIndex !== undefined
      ? dietForm.variantsForms[variantFormIndex].name
      : ''
  )

  const formMethods = useForm<VariantNameForm, VariantNameFormSchemaContext>({
    defaultValues,
    mode: 'onChange',
    context: {
      variantsForms,
      variantForm,
    },
    resolver: yupResolver(variantNameFormSchema),
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default VariantNameFormProvider
