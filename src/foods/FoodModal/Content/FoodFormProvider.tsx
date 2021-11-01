import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import {
  Food,
  FoodForm,
  foodFormSchema,
  FoodFormSchemaContext,
  getFoodForm,
  useFoods,
} from 'foods'

type Props = {
  food?: Food
  children: ReactNode
}

function FoodFormProvider({ food, children }: Props) {
  const defaultValues = getFoodForm(food)
  const { allFoods } = useFoods()

  const formMethods = useForm<FoodForm, FoodFormSchemaContext>({
    defaultValues,
    resolver: yupResolver(foodFormSchema),
    context: {
      allFoods,
      food,
    },
    mode: 'onChange',
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default FoodFormProvider
