import { useDietFormActions } from 'diets'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import { ChangeEvent, useState } from 'react'
import {
  getInsertIngredientFormAnimationKey,
  IngredientForm,
} from 'ingredients'

type Params = {
  variantIndex: number
  mealIndex: number
  index: number
  ingredientForm: IngredientForm
  onRemove: (variantIndex: number, mealIndex: number, index: number) => void
}

function useIngredientsEvents({
  variantIndex,
  mealIndex,
  index,
  onRemove,
  ingredientForm,
}: Params) {
  const [isVisible, setIsVisible] = useState(true)
  const dietFormActions = useDietFormActions()

  const oneTimeCheckActions = useOneTimeCheckActions()
  const shouldAnimate = oneTimeCheckActions.checkAndReset(
    getInsertIngredientFormAnimationKey(ingredientForm.fieldId)
  )

  function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    dietFormActions.updateIngredientForm(variantIndex, mealIndex, index, {
      amountInGrams: value,
    })
  }

  function onAnimationComplete() {
    if (!isVisible) {
      onRemove(variantIndex, mealIndex, index)
    }
  }

  function onRemoveRequest() {
    setIsVisible(false)
  }

  return {
    onAmountChange,
    onAnimationComplete,
    onRemoveRequest,
    isVisible,
    shouldAnimate,
  }
}

export default useIngredientsEvents
