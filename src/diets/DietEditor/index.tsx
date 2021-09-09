import { DietFormStoreProvider } from 'diets'
import Form from './Form'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import DndContextProvider from './DndContextProvider'
import { MealsStatsStoreProvider } from 'stats'
import { useLoadDietForm } from 'persistence'
import { Center } from '@chakra-ui/react'
import { Loader } from 'general'

function DietEditor() {
  const oneTimeCheckActions = useOneTimeCheckActions()

  const {
    onLoadFromFile,
    dietForm,
    isLoading: isImporting,
    error,
  } = useLoadDietForm()

  if (error) {
    return <div>Error on import</div>
  }

  if (isImporting) {
    return (
      <Center height="100vh">
        <Loader size="lg" label="Importing..." />
      </Center>
    )
  }

  return (
    <DietFormStoreProvider
      initialDietForm={dietForm}
      oneTimeCheckActions={oneTimeCheckActions}
    >
      <MealsStatsStoreProvider>
        <DndContextProvider>
          <Form onImport={onLoadFromFile} isEditingExistingDiet={false} />
        </DndContextProvider>
      </MealsStatsStoreProvider>
    </DietFormStoreProvider>
  )
}

export default DietEditor
