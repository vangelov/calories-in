type Food = {
  id: number
  categoryId: number
  name: string
}

type Ingredient = {
  foodId: number
  amountInGrams: number
}

type Meal = {
  name: string
  ingredients: Ingredient[]
}

type FoodsByIdMap = { [id: number]: Food }

type FoodCategory = {
  id: number
  name: string
}

type Diet = {
  id: number
  name: string
  meals: Meal[]
  foodsByIdMap: FoodsByIdMap
}

export type { Food, Ingredient, Meal, Diet, FoodsByIdMap, FoodCategory }
