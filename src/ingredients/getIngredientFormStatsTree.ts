import { Food } from 'foods'
import { IngredientForm } from './ingredientForm'
import { StatsTree, objectFromNutritionDataKeys } from 'stats'
import { DEFAULT_SERVING_SIZE_IN_GRAMS } from 'foods'

function getIngredientFormStatsTree(
  ingredientForm: IngredientForm,
  food: Food,
  round: (x: number) => number = Math.round
): StatsTree {
  const amountInGrams = round(Number(ingredientForm.amountInGrams))
  const servingSizeInGrams =
    food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS
  const scale = amountInGrams / servingSizeInGrams

  const stats = {
    amountInGrams,
    ...objectFromNutritionDataKeys(key => round(scale * food[key])),
  }

  return {
    id: ingredientForm.fieldId,
    stats,
    subtrees: [],
  }
}

export default getIngredientFormStatsTree
