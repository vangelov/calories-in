import { getMealForm, MealForm } from 'meals'
import { useScrollTo } from 'dom'
import { RefObject, useCallback } from 'react'
import { Food } from 'foods'
import { useDietFormActions } from 'diets'
import { UseDisclosureReturn } from '@chakra-ui/hooks'
import { getIngredient } from 'ingredients'
import { isMobile } from 'react-device-detect'

type Params = {
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
  scrollTargetRef: RefObject<HTMLDivElement>
  foodsDrawerDisclosure: UseDisclosureReturn
}

function useScrollToAndFocusMeal({
  getMealNameInputRefById,
  scrollTargetRef,
  foodsDrawerDisclosure,
}: Params) {
  const scrollTo = useScrollTo()
  const dietFormActions = useDietFormActions()

  function onMealAdd(foods: Food[], mealName?: string) {
    foodsDrawerDisclosure.onClose()
    const ingredients = foods.map(getIngredient)
    const mealForm = getMealForm({ name: mealName as string, ingredients })
    dietFormActions.appendMealForm(mealForm)
  }

  const onScrollToMeal = useCallback(
    async (mealForm: MealForm) => {
      const mealNameInputRef = getMealNameInputRefById(mealForm.fieldId)

      if (scrollTargetRef.current) {
        await scrollTo(scrollTargetRef.current)
      }

      if (mealNameInputRef.current && !isMobile) {
        mealNameInputRef.current.setSelectionRange(
          0,
          mealNameInputRef.current.value.length
        )
        mealNameInputRef.current.focus()
      }
    },
    [getMealNameInputRefById, scrollTo, scrollTargetRef]
  )

  return { onScrollToMeal, onMealAdd }
}

export default useScrollToAndFocusMeal
