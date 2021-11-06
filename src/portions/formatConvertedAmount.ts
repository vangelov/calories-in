import { Portion } from 'portions'

function formatConvertedAmount(amount: number, newPortion: Portion): string {
  if (newPortion.id === 'grams') {
    return Math.round(amount).toString()
  }

  const amountStringFixedTo2 = amount.toFixed(1)
  const amountFixedTo2 = Number(amountStringFixedTo2)

  return Number.isInteger(amountFixedTo2)
    ? amount.toString()
    : amountStringFixedTo2
}

export default formatConvertedAmount
