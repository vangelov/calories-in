import { Flex } from '@chakra-ui/react'
import UndoRedoButtons from './UndoRedoButtons'
import MenuButtons from './MenuButtons'
import MainButtons from './MainButtons'
import { useDietFormActions } from 'core/diets'

function Controls() {
  const dietFormStoreActions = useDietFormActions()

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
