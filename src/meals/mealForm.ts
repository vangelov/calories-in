import { Meal } from './types'
import { getIngredientForm, IngredientForm } from 'ingredients'
import { v4 as uuidv4 } from 'uuid'

type MealForm = {
  fieldId: string
  name: string
  notes?: string
  ingredientsForms: IngredientForm[]
}

function getMealForm(meal?: Meal): MealForm {
  const fieldId = uuidv4()

  if (meal) {
    return {
      fieldId,
      name: meal.name,
      ingredientsForms: meal.ingredients.map(ingredient =>
        getIngredientForm(ingredient)
      ),
    }
  }

  return {
    fieldId,
    name: '',
    ingredientsForms: [],
  }
}

function getInsertMealFormAnimationKey(fieldId: string) {
  return `insert-meal-animmation-${fieldId}`
}

export type { MealForm }

export { getMealForm, getInsertMealFormAnimationKey }
