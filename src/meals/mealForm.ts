import { Meal } from './types'
import { getIngredientForm, IngredientForm } from 'ingredients'
import { v4 as uuidv4 } from 'uuid'

type MealForm = {
  fieldId: string
  name: string
  notes?: string
  imageUrl?: string
  servings: string
  ingredientsForms: IngredientForm[]
}

function getMealForm(meal?: Meal): MealForm {
  const fieldId = uuidv4()

  if (meal) {
    const { name, imageUrl, ingredients, servings } = meal

    return {
      fieldId,
      name,
      imageUrl,
      servings: servings.toString(),
      ingredientsForms: ingredients.map(ingredient =>
        getIngredientForm(ingredient)
      ),
    }
  }

  return {
    fieldId,
    name: '',
    servings: '1',
    ingredientsForms: [],
  }
}

function getInsertMealFormAnimationKey(fieldId: string) {
  return `insert-meal-animmation-${fieldId}`
}

export type { MealForm }

export { getMealForm, getInsertMealFormAnimationKey }
