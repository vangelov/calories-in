import { Recipe } from 'recipes'

function normalizedRecipe(recipe: Recipe): Recipe {
  const { servings, ingredients } = recipe

  return {
    ...recipe,
    servings: 1,
    ingredients: ingredients.map(ingredient => ({
      ...ingredient,
      amount: ingredient.amount / servings,
    })),
  }
}

export default normalizedRecipe
