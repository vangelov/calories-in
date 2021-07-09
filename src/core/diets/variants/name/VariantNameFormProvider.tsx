import { FormProvider, useForm } from 'react-hook-form'
import { VariantField } from '../variantForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { VariantNameForm, variantNameFormSchema } from './variantNameForm'
import { ReactNode } from 'react'
import { useVariantsFormsStoreState } from '../VariantsFormsStoreProvider'

type Props = {
  children: ReactNode
}

function VariantNameFormProvider({ children }: Props) {
  const variantsFormsState = useVariantsFormsStoreState()

  const formMethods = useForm<VariantNameForm, VariantField[]>({
    defaultValues: { name: '' },
    mode: 'onChange',
    context: variantsFormsState.variantsFields,
    resolver: yupResolver(variantNameFormSchema),
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default VariantNameFormProvider
