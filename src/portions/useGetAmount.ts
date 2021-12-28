import { Food } from 'foods'
import { useCallbacksMemo } from 'general'
import { usePortions } from 'portions'
import { useCallback } from 'react'
import useGetToGramsConversionFactor from './useGetToGramsConversionFactor'
import getAmountFromPortionToGramsInternal from './getAmountFromPortionsToGrams'

function useGetAmount() {
  const { portionsById } = usePortions()
  const getToGramsConversionFactor = useGetToGramsConversionFactor()

  const getAmountFromPortionToGrams = useCallback(
    (amountInGrams: number, portionId: string, food: Food) =>
      getAmountFromPortionToGramsInternal(
        amountInGrams,
        portionId,
        food,
        portionsById
      ),
    [portionsById]
  )

  const getAmountFromGramsToPortion = useCallback(
    (amountInPortion: number, portionId: string, food: Food) => {
      const portion = portionsById[portionId]
      const factor = getToGramsConversionFactor(portion, food)
      return amountInPortion / factor
    },
    [portionsById, getToGramsConversionFactor]
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
