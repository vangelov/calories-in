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

export default getToGramsConversionFactor
