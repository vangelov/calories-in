import { MealForm, getInsertMealFormAnimationKey } from 'meals'
import { useState } from 'react'
import { useOneTimeCheckActions } from 'general'
import { useDietFormActions } from 'diets'
import { Food } from 'foods'
import { UseDisclosureReturn } from '@chakra-ui/hooks'

type Params = {
  mealForm: MealForm
  index: number
  variantIndex: number
  onRemove: (variantIndex: number, index: number) => void
  onFirstAppear: (mealForm: MealForm) => void
  foodsDrawerDisclosure: UseDisclosureReturn
}

function useMealFormEvents({
  mealForm,
  index,
  onRemove,
  variantIndex,
  onFirstAppear,
  foodsDrawerDisclosure,
}: Params) {
  const [isVisible, setIsVisible] = useState(true)
  const oneTimeCheckActions = useOneTimeCheckActions()
  const dietFormActions = useDietFormActions()
  const shouldAnimate = oneTimeCheckActions.checkAndReset(
    getInsertMealFormAnimationKey(mealForm.fieldId)
  )

  function onAnimationComplete() {
    if (shouldAnimate) {
      onFirstAppear(mealForm)
    } else if (!isVisible) {
      onRemove(variantIndex, index)
    }
  }

  function onRemoveRequest() {
    setIsVisible(false)
  }

  function onClone(mealIndex: number) {
    dietFormActions.duplicateMealForm(variantIndex, mealIndex)
  }

  function onAddFoods(foods: Food[]) {
    dietFormActions.appendIngredientsForms(
      variantIndex,
      index,
      foods.map(({ id }) => id)
    )
    foodsDrawerDisclosure.onClose()
  }

  return {
    onAnimationComplete,
    shouldAnimate,
    onRemoveRequest,
    isVisible,
    onClone,
    onAddFoods,
  }
}

export default useMealFormEvents
