import { NutritionData } from 'stats'

type Unit = 'mcg' | 'mg' | 'g'
type UnitsRecord = Record<keyof NutritionData, Unit>

const unitsRecord: UnitsRecord = {
  energy: 'g',

  fat: 'g',
  saturatedFat: 'g',
  monounsaturatedFat: 'g',
  polyunsaturatedFat: 'g',

  carbs: 'g',
  sugar: 'g',
  fiber: 'g',

  protein: 'g',

  sodium: 'mg',
  cholesterol: 'mg',

  vitaminA: 'mcg',
  vitaminB1: 'mg',
  vitaminB2: 'mg',
  vitaminB3: 'mg',
  vitaminB5: 'mg',
  vitaminB6: 'mg',
  vitaminB9: 'mcg',
  vitaminB12: 'mcg',
  vitaminC: 'mg',
  vitaminD: 'mcg',
  vitaminE: 'mg',
  vitaminK: 'mcg',

  magnesium: 'mg',
  calcium: 'mg',
  phosphorus: 'mg',
  potassium: 'mg',
  iron: 'mg',
  selenium: 'mcg',
  zinc: 'mcg',
  manganese: 'mg',
  copper: 'mg',
  choline: 'g',
}

function getUnit(name: keyof NutritionData) {
  const unit = unitsRecord[name]

  return unit
}

export default getUnit
