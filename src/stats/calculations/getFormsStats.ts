import { Food } from 'foods'
import { VariantForm } from 'variants'
import { IngredientForm } from 'ingredients'
import objectFromNutritionDataKeys from '../objectFromNutritionDataKeys'
import { DEFAULT_SERVING_SIZE_IN_GRAMS } from 'foods'
import { sumStats, avgStats } from './aggregateStats'
import { Stats } from '../types'
import { MealForm } from 'meals'
import { DietForm } from 'diets'

type StatsTree = {
  sum: Stats
  avg?: Stats
  parts: Stats[] | StatsTree[]
}

function getIngredientFormStats(
  ingredientForm: IngredientForm,
  food: Food,
  round: (x: number) => number = Math.round
): Stats {
  const amountInGrams = round(Number(ingredientForm.amountInGrams))
  const servingSizeInGrams =
    food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS
  const scale = amountInGrams / servingSizeInGrams

  return {
    amountInGrams,
    ...objectFromNutritionDataKeys(key => round(scale * food[key])),
  }
}

function getMealFormStatsTree(
  mealForm: MealForm,
  foodsById: Record<number, Food>
): StatsTree {
  const ingredientsStats = mealForm.ingredientsForms.map(ingredientForm =>
    getIngredientFormStats(ingredientForm, foodsById[ingredientForm.foodId])
  )

  return {
    sum: sumStats(ingredientsStats),
    parts: ingredientsStats,
  }
}

function getVariantFormStatsTree(
  variantForm: VariantForm,
  foodsById: Record<number, Food>
): StatsTree {
  const mealsFormsStatsTrees = variantForm.mealsForms.map(mealForm =>
    getMealFormStatsTree(mealForm, foodsById)
  )

  return {
    sum: sumStats(mealsFormsStatsTrees.map(({ sum }) => sum)),
    parts: mealsFormsStatsTrees,
  }
}

function getDietFormStatsTree(
  dietForm: DietForm,
  foodsById: Record<number, Food>
): StatsTree {
  const variantsFormsStatsTrees = dietForm.variantsForms.map(variantForm =>
    getVariantFormStatsTree(variantForm, foodsById)
  )

  return {
    sum: sumStats(variantsFormsStatsTrees.map(({ sum }) => sum)),
    parts: variantsFormsStatsTrees,
  }
}

type VariantsFormsExtendedStats = {
  variantsFormsStatsMap: Record<string, Stats>
  avgVariantsFormsStats: Stats
}

function getVariantsFormsExtendedStats(
  variantsForms: VariantForm[],
  foodsById: Record<number, Food>
): VariantsFormsExtendedStats {
  const variantsFormsStats = variantsForms.map(
    variantForm => getVariantFormStatsTree(variantForm, foodsById).sum
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

export type { VariantsFormsExtendedStats, StatsTree }

export {
  getVariantsFormsExtendedStats,
  getVariantFormStatsTree,
  getMealFormStatsTree,
  getDietFormStatsTree,
  getIngredientFormStats,
}
