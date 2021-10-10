type NutritionData = {
  energy: number

  fat: number
  saturatedFat: number
  monounsaturatedFat: number
  polyunsaturatedFat: number

  carbs: number
  sugar: number
  fiber: number

  protein: number

  sodium: number
  cholesterol: number

  vitaminA: number
  vitaminB1: number
  vitaminB2: number
  vitaminB3: number
  vitaminB5: number
  vitaminB6: number
  vitaminB9: number
  vitaminB12: number
  vitaminC: number
  vitaminD: number
  vitaminE: number
  vitaminK: number

  magnesium: number
  calcium: number
  phosphorus: number
  potassium: number
  iron: number
  selenium: number
  zinc: number
  manganese: number
  copper: number
  choline: number
}

type Stats = {
  amountInGrams: number
} & NutritionData

export type { Stats, NutritionData }
