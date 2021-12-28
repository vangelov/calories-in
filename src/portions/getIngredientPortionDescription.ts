import { Food, FoodId } from 'foods'
import { IngredientForm } from 'ingredients'
import amountAsNumber from 'stats/amountAsNumber'
import { Portion } from './types'
import getAmountFromPortionToGrams from './getAmountFromPortionsToGrams'

const UNITS_WITH_DISTANCE = ['oz', 'tsp', 'tbsp', 'fl oz', 'cup']

function getIngredientPortionDescription(
  ingredientForm: IngredientForm,
  foodsById: Record<FoodId, Food>,
  portionsById: Record<string, Portion>
) {
  const { portionId, foodId, amount } = ingredientForm
  const portion = portionsById[portionId]

  const distance = UNITS_WITH_DISTANCE.includes(portion.unit) ? ' ' : ''
  const mainPart = `${amount || 0}${distance}${portion.unit}`
  const { gramsPerAmount, millilitersPerAmount } = portion

  if (gramsPerAmount !== 1 || millilitersPerAmount) {
    const weightInGrams = Math.round(
      getAmountFromPortionToGrams(
        amountAsNumber(amount),
        portion.id,
        foodsById[foodId],
        portionsById
      )
    )

    return `${mainPart} (${weightInGrams}g)`
  }

  return mainPart
}

export default getIngredientPortionDescription
