import { useScrollTo } from 'core/utils'
import { RefObject, useEffect, useRef } from 'react'

type Params = {
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
  scrollRef: RefObject<HTMLDivElement>
}

function useScrollToAndFocusMeal({
  getMealNameInputRefById,
  scrollRef,
}: Params) {
  const pendingMealFieldIdRef = useRef<string | null>(null)
  const scrollTo = useScrollTo()

  useEffect(() => {
    async function run() {
      if (pendingMealFieldIdRef.current) {
        const mealNameInputRef = getMealNameInputRefById(
          pendingMealFieldIdRef.current
        )
        pendingMealFieldIdRef.current = null

        if (scrollRef.current && mealNameInputRef.current) {
          await scrollTo(mealNameInputRef.current, scrollRef.current)
          mealNameInputRef.current.focus()
        }
      }
    }
    run()
  }, [pendingMealFieldIdRef, getMealNameInputRefById, scrollRef, scrollTo])

  return pendingMealFieldIdRef
}

export default useScrollToAndFocusMeal
