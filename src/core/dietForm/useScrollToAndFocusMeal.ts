import { useScrollTo } from 'core/utils'
import { RefObject, useEffect, useRef } from 'react'

type Params = {
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
}

function useScrollToAndFocusMeal({ getMealNameInputRefById }: Params) {
  const pendingMealFieldIdRef = useRef<string | null>(null)
  const scrollTo = useScrollTo()

  useEffect(() => {
    async function run() {
      if (pendingMealFieldIdRef.current) {
        const mealNameInputRef = getMealNameInputRefById(
          pendingMealFieldIdRef.current
        )
        pendingMealFieldIdRef.current = null

        if (mealNameInputRef.current) {
          //await new Promise(r => setTimeout(() => r(1), 300))
          await scrollTo(mealNameInputRef.current)
          mealNameInputRef.current.focus()
        }
      }
    }
    run()
  }, [pendingMealFieldIdRef, getMealNameInputRefById, scrollTo])

  return pendingMealFieldIdRef
}

export default useScrollToAndFocusMeal
