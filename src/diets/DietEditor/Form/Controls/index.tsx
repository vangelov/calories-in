import { Flex } from '@chakra-ui/react'
import UndoRedoButtons from './UndoRedoButtons'
import MenuButtons from './MenuButtons'
import MainButtons from './MainButtons'
import { useDietFormActions } from 'diets'
import useKeyboard from './useKeyboard'

function Controls() {
  const dietFormStoreActions = useDietFormActions()

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
        />
      </Flex>
    </Flex>
  )
}

export default Controls
