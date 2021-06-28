import useScrollTo from 'general/useScrollTo'
import { RefObject, useRef } from 'react'

type Params = {
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
  scrollTargetRef: RefObject<HTMLDivElement>
}

function useScrollToAndFocusMeal({
  getMealNameInputRefById,
  scrollTargetRef,
}: Params) {
  const pendingMealFieldIdRef = useRef<string | null>(null)
  const scrollTo = useScrollTo()

  async function onScrollToMeal() {
    if (pendingMealFieldIdRef.current) {
      const mealNameInputRef = getMealNameInputRefById(
        pendingMealFieldIdRef.current
      )
      pendingMealFieldIdRef.current = null

      if (scrollTargetRef.current) {
        await scrollTo(scrollTargetRef.current)
      }

      if (mealNameInputRef.current) {
        mealNameInputRef.current.focus()
      }
    }
  }

  return { pendingMealFieldIdRef, onScrollToMeal }
}

export default useScrollToAndFocusMeal
