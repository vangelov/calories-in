import { Food } from 'foods'
import { useForm } from 'react-hook-form'
import { object, string, number } from 'yup'
import { objectFromNutritionStatsKeys, MappedNutritionStats } from 'stats'

type FoodForm = {
  id?: number
  name: string
  categoryId: number
  servingSizeInGrams: string
} & MappedNutritionStats<string>

function getFoodForm(food?: Food) {
  const servingSizeInGrams = '100'

  if (food) {
    return {
      id: food.id,
      name: food.name,
      categoryId: food.categoryId,
      servingSizeInGrams,
      ...objectFromNutritionStatsKeys(key => food[key].toString()),
    }
  }

  return {
    name: '',
    categoryId: 0,
    servingSizeInGrams,
    ...objectFromNutritionStatsKeys(key => '0'),
    energy: '',
  }
}

const foodFormSchema = object().shape({
  name: string().required('Please add a name'),
  categoryId: number()
    .notOneOf([0], 'Please select category')
    .typeError('Please select category'),
  energy: string().required('Please enter energy'),
})

function useFoodForm(foodForm: FoodForm) {
  const formMethods = useForm<FoodForm>({
    defaultValues: foodForm,
  })

  return formMethods
}

export type { FoodForm }

export { useFoodForm, getFoodForm, foodFormSchema }
export { default as useSubmitFoodForm } from './useSubmitFoodForm'
export { default as FoodFormProvider } from './FoodFormProvider'
