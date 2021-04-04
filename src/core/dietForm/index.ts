import { Diet } from 'core/types'
import { getMealForm, MealForm } from './mealForm'
import { useForm, UseFormMethods } from 'react-hook-form'

type DietForm = {
  formId: string
  name: string
  mealsForms: MealForm[]
}

function getDietForm(diet?: Diet): DietForm {
  if (diet) {
    return {
      formId: diet.id.toString(),
      name: diet.name,
      mealsForms: diet.meals.map(meal => getMealForm(meal)),
    }
  }

  const firstMeal = getMealForm()

  return {
    formId: Math.random().toString(),
    name: '',
    mealsForms: [firstMeal],
  }
}

function useDietForm(dietForm: DietForm): UseFormMethods<DietForm> {
  const formMethods = useForm<DietForm>({
    defaultValues: dietForm,
  })

  return formMethods
}

export type { DietForm }

export { getDietForm, useDietForm }

export * from './mealForm'
export * from './ingredientForm'
