import { Food } from 'core/types'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import { useFormContext } from 'react-hook-form'
import { FoodForm } from './foodForm'
import { useFoodsActions, useFoods } from './useFoodsStore'

type Params = {
  onComplete: (food: Food) => void
}
function useSubmitFoodForm({ onComplete }: Params) {
  const { handleSubmit } = useFormContext()
  const foodsActions = useFoodsActions()
  const { foodsById } = useFoods()
  const oneTimeCheckActions = useOneTimeCheckActions()

  const onSubmit = handleSubmit((foodForm: FoodForm) => {
    const id = Object.keys(foodsById).length + 1

    const food: Food = {
      id,
      name: foodForm.name,
      energy: Number(foodForm.energy),
      protein: Number(foodForm.protein),
      carbs: Number(foodForm.carbs),
      sugar: Number(foodForm.sugar),
      fiber: Number(foodForm.fiber),
      fat: Number(foodForm.fat),
      saturatedFat: Number(foodForm.saturatedFat),
      sodium: Number(foodForm.sodium),
      categoryId: foodForm.categoryId,
      addedByUser: true,
    }
    oneTimeCheckActions.set(`test-${food.id}`)
    foodsActions.setFood(food)
    onComplete(food)
  })

  return {
    onSubmit,
  }
}

export default useSubmitFoodForm
