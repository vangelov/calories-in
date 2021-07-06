import { MealField } from 'core/diets'
import useScrollTo from 'general/useScrollTo'
import { RefObject } from 'react'

type Params = {
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
  scrollTargetRef: RefObject<HTMLDivElement>
}

function useScrollToAndFocusMeal({
  getMealNameInputRefById,
  scrollTargetRef,
}: Params) {
  const scrollTo = useScrollTo()

  async function onScrollToMeal(mealField: MealField) {
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
  }

  return { onScrollToMeal }
}

export default useScrollToAndFocusMeal
