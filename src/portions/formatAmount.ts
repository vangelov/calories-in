import formatQuantity from 'format-quantity'

function formatAsNumber(amount: number) {
  const amountStringFixedTo1 = amount.toFixed(1)
  const amountFixedTo1 = Number(amountStringFixedTo1)

  return Number.isInteger(amountFixedTo1)
    ? amountFixedTo1.toString()
    : amountStringFixedTo1
}

function formatAmount(amount: number, portionId: string): string {
  if (portionId === 'grams') {
    return Math.round(amount).toString()
  }

  if (
    portionId === 'ounces' ||
    portionId === 'milliliters' ||
    portionId === 'fluid ounces'
  ) {
    return formatAsNumber(amount)
  }

  const formattedAsFractions = formatQuantity(amount) || ''

  if (formattedAsFractions.includes('.')) {
    return formatAsNumber(amount)
  }

  return formattedAsFractions
}

export default formatAmount
