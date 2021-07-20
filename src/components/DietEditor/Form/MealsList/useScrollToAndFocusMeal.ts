import { MealField } from 'core/diets'
import useScrollTo from 'general/useScrollTo'
import { RefObject, useCallback } from 'react'

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
    async (mealField: MealField) => {
      if (!mealField.fieldId) {
        return
      }
      const mealNameInputRef = getMealNameInputRefById(mealField.fieldId)

      if (scrollTargetRef.current) {
        await scrollTo(scrollTargetRef.current)
      }

      if (mealNameInputRef.current) {
        mealNameInputRef.current.focus()
      }
    },
    [getMealNameInputRefById, scrollTo, scrollTargetRef]
  )

  return { onScrollToMeal }
}

export default useScrollToAndFocusMeal
