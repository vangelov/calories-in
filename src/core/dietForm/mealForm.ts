import { Meal } from 'core/types'
import { ArrayField, Control, useFieldArray } from 'react-hook-form'
import { getIngredientForm, IngredientForm } from './ingredientForm'
import { getFormPath } from './utils'
import { v4 as uuidv4 } from 'uuid'

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

type Params = {
  control: Control
}

type MealField = Partial<ArrayField<MealForm, 'id'>>

function useMealsForms({ control }: Params) {
  const {
    fields: mealsFields,
    append: appendMealForm,
    remove: removeMealForm,
  } = useFieldArray<MealForm>({
    control,
    name: getMealsFormsPath(),
  })

  return {
    mealsFields,
    appendMealForm,
    removeMealForm,
  }
}

function getMealsFormsPath(index?: number, fieldName?: string): string {
  return getFormPath('mealsForms', index, fieldName)
}

export type { MealForm, MealField }

export { getMealForm, useMealsForms, getMealsFormsPath }
