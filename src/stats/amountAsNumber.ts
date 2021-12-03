import numericQuantity from 'numeric-quantity'

function amountAsNumber(amount: string) {
  if (amount === '') {
    return 0
  }

  const t = parseInt(amount, 10)

  if (Number.isNaN(t)) {
    return 0
  }

  const q = numericQuantity(amount)

  if (Number.isNaN(q)) {
    return t
  }

  return q
}

export default amountAsNumber
