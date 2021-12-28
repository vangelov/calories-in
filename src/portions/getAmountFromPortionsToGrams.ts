import { Food } from 'foods'
import { Portion } from 'portions'
import getToGramsConversionFactor from './getToGramsConversionFactor'

function getAmountFromPortionToGrams(
  amountInGrams: number,
  portionId: string,
  food: Food,
  portionsById: Record<string, Portion>
) {
  const portion = portionsById[portionId]
  const factor = getToGramsConversionFactor(portion, food, portionsById)
  return amountInGrams * factor
}

export default getAmountFromPortionToGrams
