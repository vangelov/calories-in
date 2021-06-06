import { useFoodsByIdDispatch, useFoodsByIdState } from 'core/foods'
import { Food } from 'core/types'
import { UseFormReturn } from 'react-hook-form'
import { FoodForm } from './foodForm'

type Params = {
  formMethods: UseFormReturn<FoodForm>
  onComplete: (food: Food) => void
}
function useSubmit({ formMethods, onComplete }: Params) {
  const { handleSubmit } = formMethods
  const foodsByIdDispatch = useFoodsByIdDispatch()
  const foodsByIdState = useFoodsByIdState()

  const onSubmit = handleSubmit((foodForm: FoodForm) => {
    const id = Object.keys(foodsByIdState).length + 1

    const food: Food = {
      id,
      name: foodForm.name,
      energy: foodForm.energy,
      protein: foodForm.protein,
      carbs: foodForm.categoryId,
      sugar: foodForm.sugar,
      fiber: foodForm.fiber,
      fat: foodForm.fat,
      saturatedFat: foodForm.saturatedFat,
      sodium: foodForm.sodium,
      categoryId: foodForm.categoryId,
    }

    foodsByIdDispatch({ type: 'addFood', food })
    onComplete(food)

    return food
  })

  return {
    onSubmit,
  }
}

export default useSubmit
