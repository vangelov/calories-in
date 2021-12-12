import { FoodId } from 'foods'

type IngredientsSeparator = {
  title: string
}

type Ingredient = {
  foodId: FoodId
  amount: number
  portionId: string
  isHeader?: boolean
}

function isIngredientsSeparator(
  ingredientOrSeparator: Ingredient | IngredientsSeparator
): ingredientOrSeparator is IngredientsSeparator {
  return (
    'title' in ingredientOrSeparator &&
    ingredientOrSeparator.title !== undefined
  )
}

export type { Ingredient, IngredientsSeparator }

export { isIngredientsSeparator }
