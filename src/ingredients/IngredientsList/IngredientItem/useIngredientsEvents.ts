import { useDietFormActions } from 'diets'
import { useOneTimeCheckActions } from 'general'
import { ChangeEvent, useState } from 'react'
import {
  getInsertIngredientFormAnimationKey,
  IngredientForm,
} from 'ingredients'
import { useToast } from '@chakra-ui/toast'
import {
  getAmount,
  Portion,
  usePortions,
  formatConvertedAmount,
} from 'portions'
import { Food } from 'foods'

type Params = {
  variantIndex: number
  mealIndex: number
  index: number
  ingredientForm: IngredientForm
  food: Food
  onRemove: (variantIndex: number, mealIndex: number, index: number) => void
}

function useIngredientsEvents({
  variantIndex,
  mealIndex,
  index,
  onRemove,
  ingredientForm,
  food,
}: Params) {
  const [isVisible, setIsVisible] = useState(true)
  const dietFormActions = useDietFormActions()
  const toast = useToast()
  const { portionsById } = usePortions()

  const oneTimeCheckActions = useOneTimeCheckActions()
  const shouldAnimate = oneTimeCheckActions.checkAndReset(
    getInsertIngredientFormAnimationKey(ingredientForm.fieldId)
  )

  function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    dietFormActions.updateIngredientForm(variantIndex, mealIndex, index, {
      amount: value,
    })
  }

  function onPortionChange(newPortion: Portion) {
    const newAmount = getAmount({
      amount: Number(ingredientForm.amount),
      fromPortion: portionsById[ingredientForm.portionId],
      toPortion: newPortion,
      food,
      foodPortion: portionsById[food.weightPortionId],
    })

    dietFormActions.updateIngredientForm(variantIndex, mealIndex, index, {
      portionId: newPortion.id,
      amount: formatConvertedAmount(newAmount, newPortion),
    })
  }

  function onAnimationComplete() {
    if (!isVisible) {
      onRemove(variantIndex, mealIndex, index)
    }
  }

  function onFoodUpdated() {
    toast({
      position: 'top',
      title: 'Food updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
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
    onFoodUpdated,
    onPortionChange,
  }
}

export default useIngredientsEvents
