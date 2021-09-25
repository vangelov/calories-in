import { Food, FoodId } from 'foods'
import { useForm } from 'react-hook-form'
import { object, string, number } from 'yup'
import { objectFromNutritionDataKeys, MappedNutritionData } from 'stats'

type FoodForm = {
  id?: FoodId
  name: string
  categoryId: number
  servingSizeInGrams: string
} & MappedNutritionData<string>

const DEFAULT_SERVING_SIZE_IN_GRAMS = 100

function getFoodForm(food?: Food) {
  if (food) {
    const servingSizeInGrams =
      food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS

    return {
      id: food.id,
      name: food.name,
      categoryId: food.categoryId,
      servingSizeInGrams: servingSizeInGrams.toString(),
      ...objectFromNutritionDataKeys(key => food[key].toString()),
    }
  }

  return {
    name: '',
    categoryId: 0,
    servingSizeInGrams: DEFAULT_SERVING_SIZE_IN_GRAMS.toString(),
    ...objectFromNutritionDataKeys(key => '0'),
    energy: '',
  }
}

const foodFormSchema = object().shape({
  name: string()
    .required('Please add a name')
    .test(
      'uniqueName',
      'This name has alredy been used',
      (name, { options }) => {
        const foodsNames = options.context as string[]

        return (
          name !== undefined && !foodsNames.includes(name.toLocaleLowerCase())
        )
      }
    ),
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

export {
  useFoodForm,
  getFoodForm,
  foodFormSchema,
  DEFAULT_SERVING_SIZE_IN_GRAMS,
}
