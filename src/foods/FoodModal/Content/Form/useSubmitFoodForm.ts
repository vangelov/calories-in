import { objectFromNutritionDataKeys } from 'stats'
import { Food, FoodForm } from 'foods'
import { useOneTimeCheckActions } from 'general'
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
    console.log('submit', foodForm)
    const food: Food = {
      id: foodForm.id !== undefined ? foodForm.id : uuidv4(),
      name: foodForm.name,
      categoryId: foodForm.categoryId,
      addedByUser: true,
      servingSizeInGrams: Number(foodForm.servingSizeInGrams),
      weightPortionId: foodForm.weightPortionId,
      gramsPerWeightPortion: Number(foodForm.gramsPerWeightPortion),
      ...objectFromNutritionDataKeys(key => Number(foodForm[key])),
    }

    if (foodForm.id === undefined) {
      oneTimeCheckActions.set(`food-appear-${food.id}`)
    }
    oneTimeCheckActions.set(`food-flash-${food.id}`)

    foodsActions.setFoods([food])
    onComplete(food)
  })

  return {
    onSubmit,
  }
}

export default useSubmitFoodForm
