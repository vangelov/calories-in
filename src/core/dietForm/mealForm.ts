import { Meal } from 'core/types'
import { getIngredientForm, IngredientForm } from './ingredientForm'
import { getFormPath } from './utils'
import { v4 as uuidv4 } from 'uuid'
import { getVariantsFormsPath } from './variantForm'

type MealForm = {
  fieldId: string
  name: string
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

type MealField = Partial<MealForm>

function getMealsFormsPath(
  variantIndex: number,
  index?: number,
  fieldName?: string
): string {
  const variantsFormsPath = getVariantsFormsPath(variantIndex, 'mealsForms')
  return getFormPath(variantsFormsPath, index, fieldName)
}

export type { MealForm, MealField }

export { getMealForm, getMealsFormsPath }
