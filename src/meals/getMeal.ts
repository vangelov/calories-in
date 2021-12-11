import { Food } from 'foods'
import { getIngredient } from 'ingredients'
import { Meal } from 'meals'
import { Recipe } from 'recipes'

function getMealFromFoods(name: string, foods: Food[]): Meal {
  return {
    name,

    ingredients: foods.map(getIngredient),
  }
}

function getMealFromRecipe(recipe: Recipe): Meal {
  return {
    name: recipe.name,
    imageUrl: recipe.imageUrl,
    ingredients: recipe.ingredients,
  }
}

export { getMealFromFoods, getMealFromRecipe }
