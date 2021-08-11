import objectFromNutritionStatsKeys from 'core/objectFromNutritionStatsKeys'
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
    const id =
      foodForm.id !== undefined
        ? foodForm.id
        : Object.keys(foodsById).length + 1

    const food: Food = {
      id,
      name: foodForm.name,
      categoryId: foodForm.categoryId,
      addedByUser: true,
      ...objectFromNutritionStatsKeys(key => Number(foodForm[key])),
    }

    if (foodForm.id === undefined) {
      oneTimeCheckActions.set(`test-${food.id}`)
    }
    oneTimeCheckActions.set(`test2-${food.id}`)

    foodsActions.setFood(food)
    onComplete(food)
  })

  return {
    onSubmit,
  }
}

export default useSubmitFoodForm
