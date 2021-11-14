import { Food, FoodId } from 'foods'
import { useForm } from 'react-hook-form'
import { object, string, number } from 'yup'
import { objectFromNutritionDataKeys, MappedNutritionData } from 'stats'
import { FoodVolumeForm, getFoodVolumeForm } from './foodVolumeForm'

type FoodForm = {
  id?: FoodId
  name: string
  categoryId: number
  servingSizeInGrams: string
  volumeForm: FoodVolumeForm
  url?: string
} & MappedNutritionData<string>

const DEFAULT_SERVING_SIZE_IN_GRAMS = 100

function getFoodForm(food?: Food) {
  const volumeForm = getFoodVolumeForm(food?.volume)

  if (food) {
    const servingSizeInGrams =
      food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS

    return {
      id: food.id,
      name: food.name,
      categoryId: food.categoryId,
      servingSizeInGrams: servingSizeInGrams.toString(),
      volumeForm,
      url: food.url,
      ...objectFromNutritionDataKeys(key => food[key].toString()),
    }
  }

  return {
    name: '',
    categoryId: 0,
    servingSizeInGrams: DEFAULT_SERVING_SIZE_IN_GRAMS.toString(),
    ...objectFromNutritionDataKeys(() => '0'),
    energy: '',
    volumeForm,
  }
}

type FoodFormSchemaContext = {
  allFoods: Food[]
  food?: Food
}

const foodFormSchema = object().shape({
  name: string()
    .required('Please add a name')
    .test(
      'uniqueName',
      'This name has already been used',
      (currentName, { options }) => {
        if (currentName === undefined) {
          return true
        }

        const { allFoods, food } = options.context as FoodFormSchemaContext

        const sameFoodExists = allFoods.some(({ name, id }) => {
          const haveSameNames = currentName.toLowerCase() === name.toLowerCase()
          return food ? id !== food.id && haveSameNames : haveSameNames
        })

        return !sameFoodExists
      }
    ),
  categoryId: number()
    .notOneOf([0], 'Please select category')
    .typeError('Please select category'),
  energy: string().required('Please enter energy'),
  servingSizeInGrams: string().required('Please enter a value'),
})

function useFoodForm(foodForm: FoodForm) {
  const formMethods = useForm<FoodForm>({
    defaultValues: foodForm,
  })

  return formMethods
}

export type { FoodForm, FoodFormSchemaContext }

export {
  useFoodForm,
  getFoodForm,
  foodFormSchema,
  DEFAULT_SERVING_SIZE_IN_GRAMS,
}
