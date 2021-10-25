import { Food } from 'foods'
import { Portion } from 'portions'

function getToGramsConversionFactor(portion: Portion, food: Food): number {
  const { gramsPerAmount, millilitersPerAmount } = portion
  const { gramsPerMilliliter } = food

  if (gramsPerAmount) {
    return gramsPerAmount
  }

  if (millilitersPerAmount && gramsPerMilliliter) {
    return millilitersPerAmount * gramsPerMilliliter
  }

  throw new Error()
}

function getAmountFromPortionToGrams(
  amountInPortion: number,
  portion: Portion,
  food: Food
): number {
  const factor = getToGramsConversionFactor(portion, food)
  return amountInPortion * factor
}

function getAmountFromGramsToPortion(
  amountInGrams: number,
  portion: Portion,
  food: Food
): number {
  const factor = getToGramsConversionFactor(portion, food)
  return amountInGrams / factor
}

type GetAmountParams = {
  fromPortion: Portion
  toPortion: Portion
  amount: number
  food: Food
}

function getAmount({ fromPortion, toPortion, amount, food }: GetAmountParams) {
  const amountInGrams = getAmountFromPortionToGrams(amount, fromPortion, food)
  return getAmountFromGramsToPortion(amountInGrams, toPortion, food)
}

export { getAmount, getAmountFromPortionToGrams, getAmountFromGramsToPortion }
