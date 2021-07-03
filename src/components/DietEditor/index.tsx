import { Diet } from 'core/types'
import { getDietForm } from 'core/diets'
import { useRef, useState } from 'react'
import {
  FormChangesStoreProvider,
  FormChangesCapabilitiesStoreProvider,
} from 'general/undoRedo'
import Form from './Form'
import { DietStatsProvider, InitialEnergyProvider } from 'core/stats'

function DietEditor() {
  const [diet] = useState<Diet | undefined>(undefined)
  const [dietForm] = useState(() => getDietForm(diet))
  const horizontalScrollRef = useRef<HTMLDivElement>(null)

  return (
    <FormChangesCapabilitiesStoreProvider key={dietForm.formId}>
      <InitialEnergyProvider>
        <DietStatsProvider>
          <FormChangesStoreProvider
            horizontalScrollRef={horizontalScrollRef}
            dietForm={dietForm}
          >
            {(currentDietForm, version, scrollTop, scrollLeft) => (
              <Form
                horizontalScrollRef={horizontalScrollRef}
                isEditingExistingDiet={diet !== undefined}
                key={version}
                dietForm={currentDietForm}
                scrollTop={scrollTop}
                scrollLeft={scrollLeft}
              />
            )}
          </FormChangesStoreProvider>
        </DietStatsProvider>
      </InitialEnergyProvider>
    </FormChangesCapabilitiesStoreProvider>
  )
}

export default DietEditor
