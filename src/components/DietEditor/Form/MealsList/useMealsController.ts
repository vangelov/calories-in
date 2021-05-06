import { getMealForm, MealField, useMealsForms } from 'core/dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useScrollTo } from 'core/utils'
import { RefObject, useEffect, useRef } from 'react'

type Params = {
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
  scrollRef: RefObject<HTMLDivElement>
}

type MealsController = {
  mealsFields: MealField[]
  onMealAdd: () => void
  onMealRemove: (index: number) => void
}

function useMealsController({
  getMealNameInputRefById,
  scrollRef,
}: Params): MealsController {
  const { mealsFields, appendMealForm, removeMealForm } = useMealsForms()
  const { saveLastChange } = useUndoRedoMethods()
  const pendingMealFieldId = useRef<string | null>(null)
  const scrollTo = useScrollTo()

  useEffect(() => {
    async function run() {
      if (pendingMealFieldId.current) {
        const mealNameInputRef = getMealNameInputRefById(
          pendingMealFieldId.current
        )
        pendingMealFieldId.current = null

        if (scrollRef.current && mealNameInputRef.current) {
          await scrollTo(mealNameInputRef.current, scrollRef.current)
          mealNameInputRef.current.focus()
        }
      }
    }
    run()
  }, [pendingMealFieldId, getMealNameInputRefById, scrollRef, scrollTo])

  function onMealAdd() {
    const mealForm = getMealForm()
    pendingMealFieldId.current = mealForm.fieldId
    appendMealForm(mealForm)
    saveLastChange()
  }

  function onMealRemove(index: number) {
    removeMealForm(index)
    saveLastChange()
  }

  return {
    mealsFields,
    onMealAdd,
    onMealRemove,
  }
}

export type { MealsController }

export default useMealsController
