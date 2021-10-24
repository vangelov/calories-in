import { Food } from 'foods'
import { IngredientForm } from './ingredientForm'
import { StatsTree, objectFromNutritionDataKeys, Stats } from 'stats'
import { DEFAULT_SERVING_SIZE_IN_GRAMS } from 'foods'
import { Portion } from 'portions'

function getIngredientFormStatsTree(
  ingredientForm: IngredientForm,
  food?: Food
): StatsTree {
  let stats: Stats

  if (food) {
    const amountInGrams = Number(ingredientForm.amount)
    const servingSizeInGrams =
      food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS
    const scale = amountInGrams / servingSizeInGrams

    stats = {
      amountInGrams,
      ...objectFromNutritionDataKeys(key => Math.round(scale * food[key])),
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
