import { getMealForm, MealForm } from 'meals'
import { useScrollTo } from 'dom'
import { RefObject, useCallback } from 'react'
import { DEFAULT_SERVING_SIZE_IN_GRAMS, Food } from 'foods'
import { useDietFormActions } from 'diets'
import { UseDisclosureReturn } from '@chakra-ui/hooks'

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
    setTimeout(() => {
      const foodsIds = foods.map(({ id }) => id)
      const ingredients = foodsIds.map(id => ({
        foodId: id,
        amountInGrams: DEFAULT_SERVING_SIZE_IN_GRAMS,
      }))
      const mealForm = getMealForm({ name: mealName as string, ingredients })
      dietFormActions.appendMealForm(mealForm)
    }, 200)
  }

  const onScrollToMeal = useCallback(
    async (mealForm: MealForm) => {
      const mealNameInputRef = getMealNameInputRefById(mealForm.fieldId)

      if (scrollTargetRef.current) {
        await scrollTo(scrollTargetRef.current)
      }

      if (mealNameInputRef.current) {
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
