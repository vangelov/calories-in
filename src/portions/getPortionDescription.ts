import { Portion } from 'portions'

function getPortionDescription(portion: Portion) {
  const { id, millilitersPerAmount } = portion

  if (millilitersPerAmount && id !== 'milliliters') {
    return `(${millilitersPerAmount} ml)`
  }

  return ''
}

export default getPortionDescription
