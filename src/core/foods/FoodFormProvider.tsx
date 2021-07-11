import { useForm } from 'react-hook-form'
import { FoodForm, foodFormSchema, getFoodForm } from './foodForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { Food } from 'core/types'

type Props = {
  food?: Food
  children: ReactNode
}

function FoodFormProvider({ food, children }: Props) {
  const defaultValues = getFoodForm(food)

  const formMethods = useForm<FoodForm>({
    defaultValues,
    resolver: yupResolver(foodFormSchema),
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default FoodFormProvider
