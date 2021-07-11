import { FormProvider, useForm } from 'react-hook-form'
import { VariantField } from '../variantForm'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  getVariantNameForm,
  VariantNameForm,
  variantNameFormSchema,
} from './variantNameForm'
import { ReactNode } from 'react'
import { useVariantsFormsStoreState } from '../VariantsFormsStoreProvider'

type Props = {
  children: ReactNode
  variantField?: VariantField
}

function VariantNameFormProvider({ children, variantField }: Props) {
  const variantsFormsState = useVariantsFormsStoreState()
  const defaultValues = getVariantNameForm(variantField)

  const formMethods = useForm<VariantNameForm, VariantField[]>({
    defaultValues,
    mode: 'onChange',
    context: variantsFormsState.variantsFields,
    resolver: yupResolver(variantNameFormSchema),
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default VariantNameFormProvider
