import { Food } from 'foods'
import { Portion } from 'portions'

function getToGramsConversionFactor(
  portion: Portion,
  food: Food,
  foodPortion: Portion
): number {
  const { gramsPerAmount, millilitersPerAmount } = portion

  if (gramsPerAmount) {
    return gramsPerAmount
  }

  if (millilitersPerAmount && foodPortion.millilitersPerAmount) {
    const { gramsPerWeightPortion } = food
    const gramsPerMilliliter =
      gramsPerWeightPortion / foodPortion.millilitersPerAmount

    return millilitersPerAmount * gramsPerMilliliter
  }

  throw new Error()
}

function getAmountFromPortionToGrams(
  amountInPortion: number,
  portion: Portion,
  food: Food,
  foodPortion: Portion
): number {
  const factor = getToGramsConversionFactor(portion, food, foodPortion)
  return amountInPortion * factor
}

function getAmountFromGramsToPortion(
  amountInGrams: number,
  portion: Portion,
  food: Food,
  foodPortion: Portion
): number {
  const factor = getToGramsConversionFactor(portion, food, foodPortion)
  return amountInGrams / factor
}

type GetAmountParams = {
  fromPortion: Portion
  toPortion: Portion
  amount: number
  food: Food
  foodPortion: Portion
}

function getAmount({
  fromPortion,
  toPortion,
  amount,
  food,
  foodPortion,
}: GetAmountParams) {
  const amountInGrams = getAmountFromPortionToGrams(
    amount,
    fromPortion,
    food,
    foodPortion
  )
  return getAmountFromGramsToPortion(
    amountInGrams,
    toPortion,
    food,
    foodPortion
  )
}

export { getAmount, getAmountFromPortionToGrams, getAmountFromGramsToPortion }
