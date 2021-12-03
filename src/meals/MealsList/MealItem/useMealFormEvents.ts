import { MealForm, getInsertMealFormAnimationKey } from 'meals'
import { useState } from 'react'
import { useOneTimeCheckActions } from 'general'
import { useDietFormActions } from 'diets'
import { Food } from 'foods'
import { UseDisclosureReturn } from '@chakra-ui/hooks'
import { useToast } from '@chakra-ui/toast'

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
  const toast = useToast()
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

  function onClone() {
    dietFormActions.duplicateMealForm(variantIndex, index)
  }

  function onEditNotes(notes?: string) {
    toast({
      status: 'success',
      position: 'top',
      title: mealForm.notes
        ? 'Your notes were edited'
        : 'Your notes were added',
      duration: 2000,
      isClosable: true,
    })

    dietFormActions.updateMealForm(variantIndex, index, {
      notes,
    })
  }

  function onAddFoods(foods: Food[]) {
    dietFormActions.appendIngredientsForms(variantIndex, index, foods)
    foodsDrawerDisclosure.onClose()
  }

  return {
    onAnimationComplete,
    shouldAnimate,
    onRemoveRequest,
    isVisible,
    onClone,
    onAddFoods,
    onEditNotes,
  }
}

export default useMealFormEvents
