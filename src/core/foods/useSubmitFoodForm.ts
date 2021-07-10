import { Food } from 'core/types'
import { UseFormReturn } from 'react-hook-form'
import { FoodForm } from './foodForm'
import { useFoodsStoreMethods, useFoodsStoreState } from './FoodsStoreProvider'

type Params = {
  formMethods: UseFormReturn<FoodForm>
  onComplete: (food: Food) => void
}
function useSubmitFoodForm({ formMethods, onComplete }: Params) {
  const { handleSubmit } = formMethods
  const foodsStoreMethods = useFoodsStoreMethods()
  const { foodsById } = useFoodsStoreState()

  const onSubmit = handleSubmit((foodForm: FoodForm) => {
    const id = Object.keys(foodsById).length + 1

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
      addedByUser: true,
    }

    foodsStoreMethods.addFood(food)
    onComplete(food)

    return food
  })

  return {
    onSubmit,
  }
}

export default useSubmitFoodForm
