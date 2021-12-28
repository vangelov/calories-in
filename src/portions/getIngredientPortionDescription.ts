import { Food, FoodId } from 'foods'
import { IngredientForm } from 'ingredients'
import amountAsNumber from 'stats/amountAsNumber'
import { Portion } from './types'

const UNITS_WITH_DISTANCE = ['oz', 'tsp', 'tbsp', 'fl oz', 'cup']

function getToGramsConversionFactor(
  portion: Portion,
  food: Food,
  portionsById: Record<string, Portion>
): number {
  const { gramsPerAmount, millilitersPerAmount } = portion

  if (gramsPerAmount) {
    return gramsPerAmount
  }

  if (millilitersPerAmount && food.volume) {
    const { portionId, weightInGrams } = food.volume
    const portion = portionsById[portionId]

    if (portion.millilitersPerAmount) {
      const gramsPerMilliliter = weightInGrams / portion.millilitersPerAmount

      return millilitersPerAmount * gramsPerMilliliter
    }
  }

  throw new Error()
}

function getAmountFromPortionToGrams(
  amountInGrams: number,
  portionId: string,
  food: Food,
  portionsById: Record<string, Portion>
) {
  const portion = portionsById[portionId]
  const factor = getToGramsConversionFactor(portion, food, portionsById)
  return amountInGrams * factor
}

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
