import { Flex, useDisclosure } from '@chakra-ui/react'
import UndoRedoButtons from './UndoRedoButtons'
import MenuButtons from './MenuButtons'
import MainButtons from './MainButtons'
import { getDietForm, useDietFormActions } from 'diets'
import useKeyboard from './useKeyboard'
import { ExportModal } from 'persistence'
import useLoadDietForm from './useLoadDietForm'
import { MissingFoodsModal } from 'foods'

function Controls() {
  const dietFormActions = useDietFormActions()
  const modalDisclosure = useDisclosure()
  const { onLoadFromFile, missingFoodsModalDisclosure } = useLoadDietForm()

  useKeyboard()

  function onClear() {
    dietFormActions.setDietForm(getDietForm())
  }

  return (
    <Flex width="100%" pt={3} alignItems="center">
      <Flex flex="4" justifyContent="space-between">
        <UndoRedoButtons />
      </Flex>

      <Flex flex="6" justifyContent="flex-end">
        <MenuButtons onImport={onLoadFromFile} onClear={onClear} />

        <MainButtons
          onMealAdd={dietFormActions.appendMealForm}
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
