import { Food } from 'foods'
import { Portion } from 'portions'

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

export default getToGramsConversionFactor
