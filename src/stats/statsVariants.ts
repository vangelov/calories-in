type StatVariant =
  | 'ingredient'
  | 'ingredientAmount'
  | 'ingredientEnergy'
  | 'meal'
  | 'mealEnergy'
  | 'diet'
  | 'dietEnergy'

function isForDiet(statVariant: StatVariant) {
  return statVariant.startsWith('diet')
}

function isForEnergy(statVariant: StatVariant) {
  return statVariant.endsWith('Energy')
}

function isForIngredient(statVaraint: StatVariant) {
  return statVaraint.startsWith('ingredient')
}

function isForMeal(statVaraint: StatVariant) {
  return statVaraint.startsWith('meal')
}

function getValueTextColor(statVariant: StatVariant) {
  if (isForIngredient(statVariant)) {
    return 'gray.500'
  }

  return 'gray.800'
}

function getValueFontWeight(statVariant: StatVariant) {
  if (statVariant === 'dietEnergy') {
    return 'bold'
  }

  if (statVariant === 'diet' || statVariant === 'mealEnergy') {
    return 'medium'
  }

  return undefined
}

function getLabelColor(statVariant: StatVariant) {
  if (isForDiet(statVariant)) {
    return 'gray.800'
  }

  return 'gray.500'
}

export {
  getValueTextColor,
  getValueFontWeight,
  isForDiet,
  isForEnergy,
  isForIngredient,
  isForMeal,
  getLabelColor,
}

export type { StatVariant }
