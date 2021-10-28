import { Food } from 'foods'
import { useCallbacksMemo } from 'general'
import { usePortions } from 'portions'
import { useCallback } from 'react'
import getToGramsConversionFactor from './getToGramsConversionFactor'

function useGetAmount() {
  const { portionsById } = usePortions()

  const getAmountFromPortionToGrams = useCallback(
    (amountInGrams: number, portionId: string, food: Food) => {
      const portion = portionsById[portionId]
      const foodPortion = portionsById[food.weightPortionId]

      const factor = getToGramsConversionFactor(portion, food, foodPortion)
      return amountInGrams * factor
    },
    [portionsById]
  )

  const getAmountFromGramsToPortion = useCallback(
    (amountInPortion: number, portionId: string, food: Food) => {
      const portion = portionsById[portionId]
      const foodPortion = portionsById[food.weightPortionId]

      const factor = getToGramsConversionFactor(portion, food, foodPortion)
      return amountInPortion / factor
    },
    [portionsById]
  )

  const getAmountFromPortionToPortion = useCallback(
    (
      amount: number,
      fromPortionId: string,
      toPortionId: string,
      food: Food
    ) => {
      const amountInGrams = getAmountFromPortionToGrams(
        amount,
        fromPortionId,
        food
      )
      return getAmountFromGramsToPortion(amountInGrams, toPortionId, food)
    },
    [getAmountFromPortionToGrams, getAmountFromGramsToPortion]
  )

  const callbacks = useCallbacksMemo({
    getAmountFromPortionToPortion,
    getAmountFromPortionToGrams,
    getAmountFromGramsToPortion,
  })

  return callbacks
}

export default useGetAmount
