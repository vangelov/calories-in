import { FormProvider, useForm } from 'react-hook-form'
import { getVariantForm, VariantForm, variantFormSchema } from './index'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactNode } from 'react'
import { useDietForm } from 'diets'
import deepCopy from 'general/deepCopy'

type Props = {
  children: ReactNode
  variantFormIndex?: number
}

function VariantFormMethodsProvider({ children, variantFormIndex }: Props) {
  const dietForm = useDietForm()
  const variantsFormsNames = dietForm.variantsForms.map(({ name }) =>
    name.toLocaleLowerCase()
  )
  const defaultValues =
    variantFormIndex !== undefined
      ? deepCopy(dietForm.variantsForms[variantFormIndex])
      : getVariantForm('')

  const formMethods = useForm<VariantForm, typeof variantsFormsNames>({
    defaultValues,
    mode: 'onChange',
    context: variantsFormsNames,
    resolver: yupResolver(variantFormSchema),
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default VariantFormMethodsProvider
