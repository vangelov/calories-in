import { Portion } from 'portions'

function formatConvertedAmount(amount: number, newPortion: Portion): string {
  if (newPortion.id === 'grams') {
    return Math.round(amount).toString()
  }

  const amountStringFixedTo1 = amount.toFixed(1)
  const amountFixedTo1 = Number(amountStringFixedTo1)

  return Number.isInteger(amountFixedTo1)
    ? amountFixedTo1.toString()
    : amountStringFixedTo1
}

export default formatConvertedAmount
