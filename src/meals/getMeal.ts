import { Food } from 'foods'
import { getIngredient } from 'ingredients'
import { Meal } from 'meals'
import { Recipe } from 'recipes'

function getMealFromFoods(name: string, foods: Food[]): Meal {
  return {
    name,
    servings: 1,
    ingredientsOrSeparators: foods.map(getIngredient),
  }
}

function getMealFromRecipe(recipe: Recipe): Meal {
  const { name, imageUrl, servings, ingredientsOrSeparators } = recipe

  return {
    name,
    imageUrl,
    servings,
    ingredientsOrSeparators,
  }
}

export { getMealFromFoods, getMealFromRecipe }
