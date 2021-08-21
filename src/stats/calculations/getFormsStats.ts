import { Food } from 'foods'
import { VariantForm } from 'variants'
import { IngredientForm } from 'ingredients'
import objectFromNutritionDataKeys from '../objectFromNutritionDataKeys'
import { DEFAULT_SERVING_SIZE_IN_GRAMS } from 'foods'
import sumStats from './sumStats'
import { Stats } from '../types'
import { MealForm } from 'meals'
import avgStats from './avgStats'

function getIngredientFormStats(
  ingredientForm: IngredientForm,
  food: Food
): Stats {
  const amountInGrams = Math.round(Number(ingredientForm.amountInGrams))
  const servingSizeInGrams =
    food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS
  const scale = amountInGrams / servingSizeInGrams

  return {
    amountInGrams,
    ...objectFromNutritionDataKeys(key => Math.round(scale * food[key])),
  }
}

function getMealFormStats(mealForm: MealForm, foodsById: Record<number, Food>) {
  const ingredientsStats = mealForm.ingredientsForms.map(ingredientForm =>
    getIngredientFormStats(ingredientForm, foodsById[ingredientForm.foodId])
  )

  return sumStats(ingredientsStats)
}

function getVariantFormStats(
  variantForm: VariantForm,
  foodsById: Record<number, Food>
) {
  const mealsFormsStats = variantForm.mealsForms.map(mealForm =>
    getMealFormStats(mealForm, foodsById)
  )

  return sumStats(mealsFormsStats)
}

type VariantsFormsExtendedStats = {
  variantsFormsStatsMap: Record<string, Stats>
  avgVariantsFormsStats: Stats
}

function getVariantsFormsExtendedStats(
  variantsForms: VariantForm[],
  foodsById: Record<number, Food>
): VariantsFormsExtendedStats {
  const variantsFormsStats = variantsForms.map(variantForm =>
    getVariantFormStats(variantForm, foodsById)
  )
  const variantsFormsStatsMap = Object.fromEntries(
    variantsForms.map(({ fieldId }, index) => [
      fieldId,
      variantsFormsStats[index],
    ])
  )
  const avgVariantsFormsStats = avgStats(variantsFormsStats)

  return { variantsFormsStatsMap, avgVariantsFormsStats }
}

export type { VariantsFormsExtendedStats }

export {
  getVariantsFormsExtendedStats,
  getVariantFormStats,
  getMealFormStats,
  getIngredientFormStats,
}
