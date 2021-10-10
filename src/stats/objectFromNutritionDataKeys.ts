import { NutritionData } from './types'

type MappedNutritionData<T> = { [k in keyof NutritionData]: T }

const NUTRITION_STATS_KEYS: (keyof NutritionData)[] = [
  'protein',
  'carbs',
  'fat',
  'saturatedFat',
  'monounsaturatedFat',
  'polyunsaturatedFat',
  'energy',
  'sugar',
  'fiber',
  'sodium',
  'cholesterol',

  'vitaminA',
  'vitaminD',
  'vitaminE',
  'vitaminK',
  'vitaminB1',
  'vitaminB12',
  'vitaminB2',
  'vitaminB5',
  'vitaminB6',
  'vitaminB3',
  'vitaminB9',
  'vitaminC',
  'vitaminD',
  'vitaminE',
  'vitaminK',

  'magnesium',
  'calcium',
  'phosphorus',
  'potassium',
  'iron',
  'selenium',
  'zinc',
  'manganese',
  'copper',
  'choline',
]

function objectFromNutritionDataKeys<T>(
  f: (key: keyof NutritionData) => T
): MappedNutritionData<T> {
  const entries = NUTRITION_STATS_KEYS.map(key => {
    return [key, f(key)]
  })

  return Object.fromEntries(entries)
}

export { NUTRITION_STATS_KEYS }

export type { MappedNutritionData }

export default objectFromNutritionDataKeys
