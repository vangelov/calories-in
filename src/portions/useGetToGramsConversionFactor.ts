import { Food } from 'foods'
import { Portion, usePortions } from 'portions'
import { useCallback } from 'react'

function useGetToGramsConversionFactor() {
  const { portionsById } = usePortions()

  const getToGramsConversionFactor = useCallback(
    (portion: Portion, food: Food): number => {
      const { gramsPerAmount, millilitersPerAmount } = portion

      if (gramsPerAmount) {
        return gramsPerAmount
      }

      if (millilitersPerAmount && food.volume) {
        const { portionId, weightInGrams } = food.volume
        const portion = portionsById[portionId]

        if (portion.millilitersPerAmount) {
          const gramsPerMilliliter =
            weightInGrams / portion.millilitersPerAmount

          return millilitersPerAmount * gramsPerMilliliter
        }
      }

      throw new Error()
    },
    [portionsById]
  )

  return getToGramsConversionFactor
}

export default useGetToGramsConversionFactor
