import { Food, NutritionStats } from 'core/types'
import { useForm } from 'react-hook-form'

type NutritionStatsAsStrings = {
  [k in keyof NutritionStats]: string
}

type FoodForm = {
  id?: number
  name: string
  categoryId: number
  servingSizeInGrams: string
} & NutritionStatsAsStrings

function getFoodForm(food?: Food) {
  const servingSizeInGrams = '100'

  if (food) {
    return {
      id: food.id,
      name: food.name,
      categoryId: food.categoryId,
      servingSizeInGrams,
      energy: food.energy.toString(),
      fat: food.fat.toString(),
      saturatedFat: food.saturatedFat.toString(),
      sodium: food.sodium.toString(),
      carbs: food.carbs.toString(),
      sugar: food.sugar.toString(),
      fiber: food.fiber.toString(),
      protein: food.protein.toString(),
    }
  }

  return {
    name: '',
    categoryId: 0,
    servingSizeInGrams,
    energy: '0',
    fat: '0',
    saturatedFat: '0',
    sodium: '0',
    carbs: '0',
    sugar: '0',
    fiber: '0',
    protein: '0',
  }
}

function useFoodForm(foodForm: FoodForm) {
  const formMethods = useForm<FoodForm>({
    defaultValues: foodForm,
  })

  return formMethods
}

export type { FoodForm }

export { useFoodForm, getFoodForm }
