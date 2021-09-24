import { objectFromNutritionDataKeys } from 'stats'
import { Food, FoodForm } from 'foods'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import { useFormContext } from 'react-hook-form'
import { useFoodsActions, useFoods } from 'foods'

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
      servingSizeInGrams: Number(foodForm.servingSizeInGrams),
      ...objectFromNutritionDataKeys(key => Number(foodForm[key])),
    }

    if (foodForm.id === undefined) {
      oneTimeCheckActions.set(`test-${food.id}`)
    }
    oneTimeCheckActions.set(`test2-${food.id}`)

    foodsActions.setFoods([food])
    onComplete(food)
  })

  return {
    onSubmit,
  }
}

export default useSubmitFoodForm
