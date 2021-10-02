import { objectFromNutritionDataKeys } from 'stats'
import { Food, FoodForm } from 'foods'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import { useFormContext } from 'react-hook-form'
import { useFoodsActions } from 'foods'
import { v4 as uuidv4 } from 'uuid'

type Params = {
  onComplete: (food: Food) => void
}

function useSubmitFoodForm({ onComplete }: Params) {
  const { handleSubmit } = useFormContext()
  const foodsActions = useFoodsActions()
  const oneTimeCheckActions = useOneTimeCheckActions()

  const onSubmit = handleSubmit((foodForm: FoodForm) => {
    const food: Food = {
      id: foodForm.id !== undefined ? foodForm.id : uuidv4(),
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
