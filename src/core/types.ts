type Food = {
  id: number
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

type Diet = {
  id: number
  name: string
  meals: Meal[]
}

export type { Food, Ingredient, Meal, Diet }
