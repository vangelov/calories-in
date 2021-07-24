import { FormProvider, useForm } from 'react-hook-form'
import { getVariantForm, VariantForm, variantFormSchema } from '../variantForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactNode } from 'react'
import { useDietForm } from '../useDietFormStore'
import deepCopy from 'general/deepCopy'

type Props = {
  children: ReactNode
  variantFormIndex?: number
}

function VariantFormMethodsProvider({ children, variantFormIndex }: Props) {
  const dietForm = useDietForm()
  const defaultValues =
    variantFormIndex !== undefined
      ? deepCopy(dietForm.variantsForms[variantFormIndex])
      : getVariantForm('')

  const formMethods = useForm<VariantForm, VariantForm[]>({
    defaultValues,
    mode: 'onChange',
    context: dietForm.variantsForms,
    resolver: yupResolver(variantFormSchema),
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default VariantFormMethodsProvider
