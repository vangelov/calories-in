import { getDietForm } from 'core/diets'
import { useRef } from 'react'
import { FormChangesStoreProvider } from 'general/undoRedo'
import Form from './Form'
import { DietFormStoreProvider } from 'core/diets'

function DietEditor() {
  const dietForm = getDietForm()
  const horizontalScrollRef = useRef<HTMLDivElement>(null)

  return (
    <DietFormStoreProvider initialDietForm={dietForm}>
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
