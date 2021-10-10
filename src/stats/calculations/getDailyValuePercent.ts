import { NutritionData } from 'stats'

type DailyValuesRecord = Partial<Record<keyof NutritionData, number>>

// From: https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels
const DAILY_VALUES_RECORD: DailyValuesRecord = {
  calcium: 1300,
  fiber: 28,
  magnesium: 420,
  manganese: 2.3,
  phosphorus: 1250,
  potassium: 4700,
  vitaminA: 900,
  vitaminB1: 1.5,
  vitaminB2: 1.3,
  vitaminB5: 5,
  vitaminB6: 1.7,
  vitaminB12: 2.4,
  vitaminC: 90,
  vitaminD: 20,
  vitaminE: 15,
  vitaminK: 120,
  copper: 0.9,
  selenium: 55,
  sodium: 2300,
  cholesterol: 300,
  iron: 18,
  saturatedFat: 20,
  choline: 550,
}

function getDailyValuePercent(name: keyof NutritionData, value: number) {
  const dailyValue = DAILY_VALUES_RECORD[name]

  if (dailyValue === undefined) {
    return undefined
  }

  return Math.round((100 * value) / dailyValue)
}

export default getDailyValuePercent
