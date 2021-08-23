import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactNode } from 'react'
import { useDietForm } from 'diets'
import {
  getVariantNameForm,
  VariantNameForm,
  variantNameFormSchema,
} from './variantNameForm'

type Props = {
  children: ReactNode
  variantFormIndex?: number
}

function VariantNameFormProvider({ children, variantFormIndex }: Props) {
  const dietForm = useDietForm()
  const variantsFormsNames = dietForm.variantsForms.map(({ name }) =>
    name.toLocaleLowerCase()
  )
  const defaultValues = getVariantNameForm(
    variantFormIndex !== undefined
      ? dietForm.variantsForms[variantFormIndex].name
      : ''
  )

  const formMethods = useForm<VariantNameForm, typeof variantsFormsNames>({
    defaultValues,
    mode: 'onChange',
    context: variantsFormsNames,
    resolver: yupResolver(variantNameFormSchema),
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default VariantNameFormProvider
