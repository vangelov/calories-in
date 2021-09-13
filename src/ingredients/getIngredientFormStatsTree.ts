import { Food } from 'foods'
import { IngredientForm } from './ingredientForm'
import { StatsTree, objectFromNutritionDataKeys, Stats } from 'stats'
import { DEFAULT_SERVING_SIZE_IN_GRAMS } from 'foods'

function getIngredientFormStatsTree(
  ingredientForm: IngredientForm,
  food?: Food,
  round: (x: number) => number = Math.round
): StatsTree {
  let stats: Stats

  if (food) {
    const amountInGrams = round(Number(ingredientForm.amountInGrams))
    const servingSizeInGrams =
      food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS
    const scale = amountInGrams / servingSizeInGrams

    stats = {
      amountInGrams,
      ...objectFromNutritionDataKeys(key => round(scale * food[key])),
    }
  } else {
    stats = {
      amountInGrams: 0,
      ...objectFromNutritionDataKeys(() => 0),
    }
  }

  return {
    id: ingredientForm.fieldId,
    stats,
    subtrees: [],
  }
}

export default getIngredientFormStatsTree
