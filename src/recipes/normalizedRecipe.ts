import { Recipe } from 'recipes'
import { isIngredientsSeparator } from 'ingredients'

function normalizedRecipe(recipe: Recipe): Recipe {
  const { servings, ingredientsOrSeparators } = recipe

  return {
    ...recipe,
    servings: 1,
    ingredientsOrSeparators: ingredientsOrSeparators.map(
      ingredientOrSeparator => {
        if (isIngredientsSeparator(ingredientOrSeparator)) {
          return ingredientOrSeparator
        }

        return {
          ...ingredientOrSeparator,
          amount: ingredientOrSeparator.amount / servings,
        }
      }
    ),
  }
}

export default normalizedRecipe
