type NutritionStats = {
  protein: number
  carbs: number
  fat: number
  energy: number
  saturatedFat: number
  sugar: number
  fiber: number
  sodium: number
}

type Food = {
  id: number
  categoryId: number
  name: string
  addedByUser?: boolean
} & NutritionStats

type Ingredient = {
  foodId: number
  amountInGrams: number
}

type Meal = {
  name: string
  ingredients: Ingredient[]
}

type FoodCategory = {
  id: number
  name: string
  color: string
}

type Diet = {
  id: number
  name: string
  meals: Meal[]
}

export type { Food, Ingredient, Meal, Diet, FoodCategory, NutritionStats }
