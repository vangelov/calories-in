import { MealForm } from 'meals'
import { useScrollTo } from 'dom'
import { RefObject, useCallback } from 'react'
import { isMobile } from 'react-device-detect'

type Params = {
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
  scrollTargetRef: RefObject<HTMLDivElement>
}

function useScrollToAndFocusMeal({
  getMealNameInputRefById,
  scrollTargetRef,
}: Params) {
  const scrollTo = useScrollTo()

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

  return { onScrollToMeal }
}

export default useScrollToAndFocusMeal
