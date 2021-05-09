import { Food } from 'core/types'
import { Stats } from './types'

function getIngredientStats(amountInGrams: number, food: Food): Stats {
  const scale = amountInGrams / 100
  const energy = Math.round(scale * food.energy)
  const protein = Math.round(scale * food.protein)
  const carbs = Math.round(scale * food.carbs)
  const fat = Math.round(scale * food.fat)

  return {
    amountInGrams,
    energy,
    protein,
    carbs,
    fat,
  }
}

export default getIngredientStats
