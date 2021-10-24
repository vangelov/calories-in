import { Portion } from './types'

const defaultPortions: Portion[] = [
  {
    id: 'grams',
    unit: 'g',
    gramsPerAmount: 1,
  },
  {
    id: 'ounces',
    unit: 'oz',
    gramsPerAmount: 28.34952,
  },
  {
    id: 'milliters',
    unit: 'ml',
    millilitersPerAmount: 1,
  },
  {
    id: 'teaspoons',
    unit: 'tsp',
    millilitersPerAmount: 5,
  },
  {
    id: 'tablespoons',
    unit: 'tsp',
    millilitersPerAmount: 15,
  },
  {
    id: 'fluid ounces',
    unit: 'fl oz',
    millilitersPerAmount: 30,
  },
  {
    id: 'cups',
    unit: 'c',
    millilitersPerAmount: 240,
  },
]

export default defaultPortions
