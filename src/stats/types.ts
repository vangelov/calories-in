type NutritionData = {
  protein: number
  carbs: number
  fat: number
  energy: number
  saturatedFat: number
  sugar: number
  fiber: number
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
  iodine: number
}

type Stats = {
  amountInGrams: number
} & NutritionData

export type { Stats, NutritionData }
