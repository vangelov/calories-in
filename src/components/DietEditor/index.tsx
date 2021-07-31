import { getDietForm } from 'core/diets'
import Form from './Form'
import { DietFormStoreProvider } from 'core/diets'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import DndContextProvider from './DndContextProvider'
import { MealsStatsStoreProvider } from 'core/stats'

function DietEditor() {
  const dietForm = getDietForm()
  const oneTimeCheckActions = useOneTimeCheckActions()

  return (
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
  )
}

export default DietEditor
