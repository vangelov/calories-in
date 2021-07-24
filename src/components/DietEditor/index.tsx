import { getDietForm } from 'core/diets'
import { useRef } from 'react'
import { FormChangesStoreProvider } from 'general/undoRedo'
import Form from './Form'
import { DietFormStoreProvider } from 'core/diets'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import DndContextProvider from './DndContextProvider'

function DietEditor() {
  const dietForm = getDietForm()
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const oneTimeCheckActions = useOneTimeCheckActions()

  return (
    <DietFormStoreProvider
      initialDietForm={dietForm}
      oneTimeCheckActions={oneTimeCheckActions}
    >
      <DndContextProvider>
        <FormChangesStoreProvider
          horizontalScrollRef={horizontalScrollRef}
          initialDietForm={dietForm}
        >
          <Form
            horizontalScrollRef={horizontalScrollRef}
            isEditingExistingDiet={false}
          />
        </FormChangesStoreProvider>
      </DndContextProvider>
    </DietFormStoreProvider>
  )
}

export default DietEditor
