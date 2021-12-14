import { useDietFormActions } from 'diets'
import { useOneTimeCheckActions } from 'general'
import { ChangeEvent, useState } from 'react'
import {
  getInsertIngredientFormAnimationKey,
  IngredientForm,
} from 'ingredients'
import { useToast } from '@chakra-ui/toast'
import { Portion, formatAmount, useGetAmount } from 'portions'
import { Food } from 'foods'
import amountAsNumber from 'stats/amountAsNumber'

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
  const { getAmountFromPortionToPortion } = useGetAmount()

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
    const newAmount = getAmountFromPortionToPortion(
      amountAsNumber(ingredientForm.amount),
      ingredientForm.portionId,
      newPortion.id,
      food
    )

    dietFormActions.updateIngredientForm(variantIndex, mealIndex, index, {
      portionId: newPortion.id,
      amount: formatAmount(newAmount, newPortion.id),
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
