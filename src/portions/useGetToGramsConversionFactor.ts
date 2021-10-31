import { Food } from 'foods'
import { Portion, usePortions } from 'portions'
import { useCallback } from 'react'

function getToGramsConversionFactorInternal(
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

function useGetToGramsConversionFactor() {
  const { portionsById } = usePortions()

  const getToGramsConversionFactorCallback = useCallback(
    (portion: Portion, food: Food) =>
      getToGramsConversionFactorInternal(portion, food, portionsById),
    [portionsById]
  )

  return getToGramsConversionFactorCallback
}

export { getToGramsConversionFactorInternal as getToGramsConversionFactor }

export default useGetToGramsConversionFactor
