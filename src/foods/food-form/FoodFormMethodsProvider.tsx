import { useForm } from 'react-hook-form'
import { FoodForm, foodFormSchema, getFoodForm } from './index'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { Food } from 'foods'
import { useFoods } from 'foods/useFoodsStore'

type Props = {
  food?: Food
  children: ReactNode
}

function FoodFormMethodsProvider({ food, children }: Props) {
  const defaultValues = getFoodForm(food)
  const { allFoods } = useFoods()
  const allFoodsNames = allFoods.map(({ name }) => name.toLocaleLowerCase())

  const formMethods = useForm<FoodForm, typeof allFoodsNames>({
    defaultValues,
    resolver: yupResolver(foodFormSchema),
    context: allFoodsNames,
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default FoodFormMethodsProvider
