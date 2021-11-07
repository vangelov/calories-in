import { useDietFormActions } from 'diets'
import { useOneTimeCheckActions } from 'general'
import { IngredientForm } from 'ingredients'
import { useRef, useState } from 'react'

type Params = {
  variantIndex: number
  mealIndex: number
  index: number
  ingredientForm: IngredientForm
}

function useNotesEvents({
  variantIndex,
  mealIndex,
  index,
  ingredientForm,
}: Params) {
  const [areNotesVisible, setAreNotesVisible] = useState(true)
  const dietFormActions = useDietFormActions()
  const oneTimeCheckActions = useOneTimeCheckActions()
  const ref = useRef<string>()

  const shouldAnimateNotes = oneTimeCheckActions.checkAndReset(
    `notes-${ingredientForm.fieldId}`
  )

  function onEditNotes(notes?: string) {
    if (ingredientForm.notes) {
      ref.current = notes
      setAreNotesVisible(false)
    } else {
      if (notes) {
        dietFormActions.updateIngredientForm(variantIndex, mealIndex, index, {
          notes,
        })
      }
      setAreNotesVisible(Boolean(notes))
    }
  }

  function onNotesAnimationComplete() {
    if (!areNotesVisible) {
      dietFormActions.updateIngredientForm(variantIndex, mealIndex, index, {
        notes: ref.current,
      })
      ref.current = undefined

      setAreNotesVisible(true)
    }
  }

  return {
    areNotesVisible,
    shouldAnimateNotes,
    onEditNotes,
    onNotesAnimationComplete,
  }
}

type NotesEvents = ReturnType<typeof useNotesEvents>

export type { NotesEvents }

export default useNotesEvents
