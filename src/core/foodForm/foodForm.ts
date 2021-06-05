import { Food, NutritionStats } from 'core/types'
import { useForm } from 'react-hook-form'

type FoodForm = {
  name: string
  categoryId: number
  servingSizeInGrams: number
} & NutritionStats

function getFoodForm(food?: Food) {
  const servingSizeInGrams = 100

  if (food) {
    return {
      name: food.name,
      categoryId: food.categoryId,
      servingSizeInGrams,
      energy: food.energy,
      fat: food.fat,
      saturatedFat: food.saturatedFat,
      sodium: food.sodium,
      carbs: food.carbs,
      sugar: food.sugar,
      fiber: food.fiber,
      protein: food.protein,
    }
  }

  return {
    name: '',
    categoryId: 0,
    servingSizeInGrams,
    energy: 0,
    fat: 0,
    saturatedFat: 0,
    sodium: 0,
    carbs: 0,
    sugar: 0,
    fiber: 0,
    protein: 0,
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
