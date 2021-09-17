import { DietFormStoreProvider } from 'diets'
import Form from './Form'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import DndContextProvider from './DndContextProvider'
import { MealsStatsStoreProvider } from 'stats'
import { useState } from 'react'
import { loadLastOrDefaultDietForm } from 'persistence'

function DietEditor() {
  const oneTimeCheckActions = useOneTimeCheckActions()
  const [dietForm] = useState(loadLastOrDefaultDietForm)

  return (
    <>
      <DietFormStoreProvider
        initialDietForm={dietForm}
        oneTimeCheckActions={oneTimeCheckActions}
      >
        <MealsStatsStoreProvider>
          <DndContextProvider>
            <Form isEditingExistingDiet={false} />
          </DndContextProvider>
        </MealsStatsStoreProvider>
      </DietFormStoreProvider>
    </>
  )
}

export default DietEditor
