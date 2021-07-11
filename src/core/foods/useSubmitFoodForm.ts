import { Food } from 'core/types'
import { useFormContext } from 'react-hook-form'
import { FoodForm } from './foodForm'
import { useFoodsStoreMethods, useFoodsStoreState } from './FoodsStoreProvider'

type Params = {
  onComplete: (food: Food) => void
}
function useSubmitFoodForm({ onComplete }: Params) {
  const { handleSubmit } = useFormContext()
  const foodsStoreMethods = useFoodsStoreMethods()
  const { foodsById } = useFoodsStoreState()

  const onSubmit = handleSubmit((foodForm: FoodForm) => {
    const id = Object.keys(foodsById).length + 1

    const food: Food = {
      id,
      name: foodForm.name,
      energy: Number(foodForm.energy),
      protein: Number(foodForm.protein),
      carbs: Number(foodForm.categoryId),
      sugar: Number(foodForm.sugar),
      fiber: Number(foodForm.fiber),
      fat: Number(foodForm.fat),
      saturatedFat: Number(foodForm.saturatedFat),
      sodium: Number(foodForm.sodium),
      categoryId: foodForm.categoryId,
      addedByUser: true,
    }

    foodsStoreMethods.addFood(food)
    onComplete(food)
  })

  return {
    onSubmit,
  }
}

export default useSubmitFoodForm
