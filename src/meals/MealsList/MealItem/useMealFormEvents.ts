import { MealForm, getInsertMealFormAnimationKey } from 'meals'
import { useState } from 'react'
import { useOneTimeCheckActions } from 'general'
import { useDietFormActions } from 'diets'

type Params = {
  mealForm: MealForm
  index: number
  variantIndex: number
  onRemove: (variantIndex: number, index: number) => void
  onFirstAppear: (mealForm: MealForm) => void
}

function useMealFormEvents({
  mealForm,
  index,
  onRemove,
  variantIndex,
  onFirstAppear,
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

  return {
    onAnimationComplete,
    shouldAnimate,
    onRemoveRequest,
    isVisible,
    onClone,
  }
}

export default useMealFormEvents
