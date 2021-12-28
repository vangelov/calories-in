import { Food } from 'foods'
import { Portion, usePortions } from 'portions'
import { useCallback } from 'react'
import getToGramsConversionFactor from './getToGramsConversionFactor'

function useGetToGramsConversionFactor() {
  const { portionsById } = usePortions()

  const getToGramsConversionFactorCallback = useCallback(
    (portion: Portion, food: Food) =>
      getToGramsConversionFactor(portion, food, portionsById),
    [portionsById]
  )

  return getToGramsConversionFactorCallback
}

export default useGetToGramsConversionFactor
