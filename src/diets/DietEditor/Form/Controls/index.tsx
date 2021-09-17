import { Flex, useDisclosure } from '@chakra-ui/react'
import UndoRedoButtons from './UndoRedoButtons'
import MenuButtons from './MenuButtons'
import MainButtons from './MainButtons'
import { useDietFormActions } from 'diets'
import useKeyboard from './useKeyboard'
import { ExportModal } from 'persistence'
import useLoadDietForm from './useLoadDietForm'
import { MissingFoodsModal } from 'foods'

type Props = {
  onImport: () => void
}

function Controls({ onImport }: Props) {
  const dietFormStoreActions = useDietFormActions()
  const modalDisclosure = useDisclosure()
  const { onLoadFromFile, missingFoodsModalDisclosure } = useLoadDietForm()

  useKeyboard()

  return (
    <Flex width="100%" pt={3} alignItems="center">
      <Flex flex="4" justifyContent="space-between">
        <UndoRedoButtons />
      </Flex>

      <Flex flex="6" justifyContent="flex-end">
        <MenuButtons onImport={onLoadFromFile} />

        <MainButtons
          onMealAdd={dietFormStoreActions.appendMealForm}
          onSave={() => {}}
          onExport={modalDisclosure.onOpen}
        />

        <ExportModal
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />

        <MissingFoodsModal
          isOpen={missingFoodsModalDisclosure.isOpen}
          onCancel={missingFoodsModalDisclosure.onClose}
        />
      </Flex>
    </Flex>
  )
}

export default Controls
