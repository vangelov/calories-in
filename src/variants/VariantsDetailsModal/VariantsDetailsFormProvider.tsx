import { FormProvider, useForm } from 'react-hook-form'
import { ReactNode } from 'react'
import {
  getVariantsDetailsForm,
  VariantsDetailsForm,
} from './variantsDetailsForm'
import { VariantForm } from 'variants/variant-form'
import { Stats } from 'stats'

type Props = {
  children: ReactNode
  initialVariantForm: VariantForm
  initialVariantStats: Stats
}

function VariantsDetailsFormProvider({
  children,
  initialVariantForm,
  initialVariantStats,
}: Props) {
  const defaultValues = getVariantsDetailsForm(
    initialVariantForm.fieldId,
    initialVariantStats
  )

  const formMethods = useForm<VariantsDetailsForm>({
    defaultValues,
    mode: 'onChange',
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default VariantsDetailsFormProvider
