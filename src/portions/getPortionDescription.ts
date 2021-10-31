import { Portion } from 'portions'

function getPortionDescription(portion: Portion) {
  const { id, gramsPerAmount, millilitersPerAmount } = portion

  if (gramsPerAmount || (millilitersPerAmount && id === 'milliliters')) {
    return `(${portion.id})`
  }

  if (millilitersPerAmount) {
    return `(${portion.id}, ${millilitersPerAmount} ml)`
  }

  return ''
}

export default getPortionDescription
