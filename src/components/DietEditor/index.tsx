import { Diet } from 'core/types'
import { getDietForm } from 'core/diets'
import { useRef, useState } from 'react'
import { FormChangesStoreProvider } from 'general/undoRedo'
import Form from './Form'
import { MealsStatsStoreProvider, InitialEnergyProvider } from 'core/stats'

function DietEditor() {
  const [diet] = useState<Diet | undefined>(undefined)
  const [dietForm] = useState(() => getDietForm(diet))
  const horizontalScrollRef = useRef<HTMLDivElement>(null)

  return (
    <InitialEnergyProvider key={dietForm.formId}>
      <MealsStatsStoreProvider>
        <FormChangesStoreProvider
          horizontalScrollRef={horizontalScrollRef}
          dietForm={dietForm}
        >
          <Form
            horizontalScrollRef={horizontalScrollRef}
            isEditingExistingDiet={diet !== undefined}
          />
        </FormChangesStoreProvider>
      </MealsStatsStoreProvider>
    </InitialEnergyProvider>
  )
}

export default DietEditor
