import { DietFormStoreProvider } from 'diets'
import Form from './Form'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import DndContextProvider from './DndContextProvider'
import { MealsStatsStoreProvider } from 'stats'
import { Center } from '@chakra-ui/react'
import { Loader } from 'general'
import useLoadDietForm from './useLoadDietForm'
import MissingFoodsModal from './MissingFoodsModal'

function DietEditor() {
  const oneTimeCheckActions = useOneTimeCheckActions()

  const {
    onLoadFromFile,
    dietForm,
    isLoading: isImporting,
    missingFoodsModal,
    onMissingFoodsModalConfirm,
    onMissingFoodsModalCancel,
  } = useLoadDietForm()

  return (
    <>
      {isImporting ? (
        <Center height="100vh">
          <Loader size="lg" label="Importing..." />
        </Center>
      ) : (
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
      )}

      <MissingFoodsModal
        isOpen={missingFoodsModal.isOpen}
        onCancel={onMissingFoodsModalCancel}
        onConfirm={onMissingFoodsModalConfirm}
      />
    </>
  )
}

export default DietEditor
