import { getDietForm } from 'core/diets'
import { useRef } from 'react'
import { FormChangesStoreProvider } from 'general/undoRedo'
import Form from './Form'
import { DietFormStoreProvider } from 'core/diets'
import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'
import { useDndRespondersStoreMethods } from 'general/dndResponders'

function DietEditor() {
  const dietForm = getDietForm()
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const animationsStoreActions = useOneTimeCheckStoreMethods()
  const dndRespondersActions = useDndRespondersStoreMethods()

  return (
    <DietFormStoreProvider
      initialDietForm={dietForm}
      animationsStoreActions={animationsStoreActions}
      dndRespondersActions={dndRespondersActions}
    >
      <FormChangesStoreProvider
        horizontalScrollRef={horizontalScrollRef}
        initialDietForm={dietForm}
      >
        <Form
          horizontalScrollRef={horizontalScrollRef}
          isEditingExistingDiet={false}
        />
      </FormChangesStoreProvider>
    </DietFormStoreProvider>
  )
}

export default DietEditor
