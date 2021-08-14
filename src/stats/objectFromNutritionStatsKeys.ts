import { NutritionStats } from 'foods'

type MappedNutritionStats<T> = { [k in keyof NutritionStats]: T }

const NUTRITION_STATS_KEYS: (keyof NutritionStats)[] = [
  'protein',
  'carbs',
  'fat',
  'saturatedFat',
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
  'magnesium',
  'calcium',
  'phosphorus',
  'potassium',
  'iron',
  'selenium',
  'zinc',
  'manganese',
  'copper',
  'iodine',
]

function objectFromNutritionStatsKeys<T>(
  f: (key: keyof NutritionStats) => T
): MappedNutritionStats<T> {
  const entries = NUTRITION_STATS_KEYS.map(key => {
    return [key, f(key)]
  })

  return Object.fromEntries(entries)
}

export { NUTRITION_STATS_KEYS }

export type { MappedNutritionStats }

export default objectFromNutritionStatsKeys
