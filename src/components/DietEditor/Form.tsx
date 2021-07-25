import { useDietForm, useDietFormActions } from 'core/diets'
import { FormChangesStoreProvider } from 'general/undoRedo'
import deepCopy from 'general/deepCopy'
import Page from './Page'
import { useRef } from 'react'

type Props = {
  isEditingExistingDiet: boolean
}

function Form({ isEditingExistingDiet }: Props) {
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()

  function onUndoOrRedo(form: object) {
    dietFormActions.setDietForm(deepCopy(form))
  }

  return (
    <FormChangesStoreProvider
      horizontalScrollRef={horizontalScrollRef}
      form={dietForm}
      onUndo={onUndoOrRedo}
      onRedo={onUndoOrRedo}
    >
      <Page isEditingExistingDiet={isEditingExistingDiet} />
    </FormChangesStoreProvider>
  )
}

export default Form
