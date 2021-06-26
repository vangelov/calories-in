import { Diet } from 'core/types'
import { getDietForm } from 'core/diets'
import { useState } from 'react'
import {
  UndoRedoMethodsProvider,
  UndoRedoStateProvider,
} from 'general/undoRedo'
import Form from './Form'
import { DietStatsProvider, InitialEnergyProvider } from 'core/stats'

function DietEditor() {
  const [diet] = useState<Diet | undefined>(undefined)
  const [dietForm] = useState(() => getDietForm(diet))

  return (
    <UndoRedoStateProvider key={dietForm.formId}>
      <InitialEnergyProvider>
        <DietStatsProvider>
          <UndoRedoMethodsProvider dietForm={dietForm}>
            {(currentDietForm, version, scrollTop) => (
              <Form
                isEditingExistingDiet={diet !== undefined}
                key={version}
                dietForm={currentDietForm}
                scrollTop={scrollTop}
              />
            )}
          </UndoRedoMethodsProvider>
        </DietStatsProvider>
      </InitialEnergyProvider>
    </UndoRedoStateProvider>
  )
}

export default DietEditor
