import { Portion } from './types'

const defaultPortions: Portion[] = [
  {
    id: 'grams',
    unit: 'g',
    gramsPerAmount: 1,
    singular: 'gram',
  },
  {
    id: 'ounces',
    unit: 'oz',
    gramsPerAmount: 28.34952,
    singular: 'ounce',
  },
  {
    id: 'milliliters',
    unit: 'ml',
    millilitersPerAmount: 1,
    singular: 'milliliter',
  },
  {
    id: 'teaspoons',
    unit: 'tsp',
    millilitersPerAmount: 5,
    singular: 'teaspoon',
  },
  {
    id: 'tablespoons',
    unit: 'tbsp',
    millilitersPerAmount: 15,
    singular: 'tablespoon',
  },
  {
    id: 'fluid ounces',
    unit: 'fl oz',
    millilitersPerAmount: 30,
    singular: 'fluid ounce',
  },
  {
    id: 'cups',
    unit: 'cup',
    millilitersPerAmount: 240,
    singular: 'cup',
  },
]

export default defaultPortions
