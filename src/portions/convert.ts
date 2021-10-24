import { Food } from 'foods'
import { Portion } from 'portions'

function getAmountFromGramsToPortion(
  amountInGrams: number,
  toPortion: Portion,
  food: Food
): number {
  const { gramsPerAmount, millilitersPerAmount } = toPortion

  if (gramsPerAmount) {
    return amountInGrams / gramsPerAmount
  }

  if (millilitersPerAmount && food.gramsPerMilliliter) {
    return amountInGrams / (millilitersPerAmount * food.gramsPerMilliliter)
  }

  throw new Error()
}

function getAmountInGrams(
  amount: number,
  portion: Portion,
  food: Food
): number {
  const { gramsPerAmount, millilitersPerAmount } = portion

  if (gramsPerAmount) {
    return amount * gramsPerAmount
  }

  if (millilitersPerAmount && food.gramsPerMilliliter) {
    return amount * millilitersPerAmount * food.gramsPerMilliliter
  }

  throw new Error()
}

export { getAmountInGrams, getAmountFromGramsToPortion }
