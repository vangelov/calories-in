import { DietFormStoreProvider } from 'diets'
import Form from './Form'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import DndContextProvider from './DndContextProvider'
import { MealsStatsStoreProvider } from 'stats'
import { useLoadDietForm } from 'persistence'
import { Center, HStack, Spinner, Text } from '@chakra-ui/react'

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
        <HStack spacing={2}>
          <Spinner color="teal" size="lg" />
          <Text fontSize="lg">Importing...</Text>
        </HStack>
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
