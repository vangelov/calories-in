import { Flex, useDisclosure } from '@chakra-ui/react'
import UndoRedoButtons from './UndoRedoButtons'
import MenuButtons from './MenuButtons'
import MainButtons from './MainButtons'
import { useDietFormActions } from 'diets'
import useKeyboard from './useKeyboard'
import PreviewAndDownloadModal from 'export/PreviewAndDownloadModal'

function Controls() {
  const dietFormStoreActions = useDietFormActions()
  const modalDisclosure = useDisclosure()

  useKeyboard()

  return (
    <Flex width="100%" pt={3} alignItems="center">
      <Flex flex="4" justifyContent="space-between">
        <UndoRedoButtons />
      </Flex>

      <Flex flex="6" justifyContent="flex-end">
        <MenuButtons />

        <MainButtons
          onMealAdd={dietFormStoreActions.appendMealForm}
          onSave={() => {}}
          onExport={modalDisclosure.onOpen}
        />

        <PreviewAndDownloadModal
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </Flex>
    </Flex>
  )
}

export default Controls
