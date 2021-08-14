import { MealForm, getInsertMealFormAnimationKey } from 'meals'
import { useState } from 'react'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'

type Params = {
  mealForm: MealForm
  index: number
  variantIndex: number
  onRemove: (variantIndex: number, index: number) => void
  onFirstAppear: (mealForm: MealForm) => void
}

function useActions({
  mealForm,
  index,
  onRemove,
  variantIndex,
  onFirstAppear,
}: Params) {
  const [isVisible, setIsVisible] = useState(true)
  const oneTimeCheckActions = useOneTimeCheckActions()
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

  return { onAnimationComplete, shouldAnimate, onRemoveRequest, isVisible }
}

export default useActions
