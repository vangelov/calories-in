import { Flex } from '@chakra-ui/react'
import UndoRedoButtons from './UndoRedoButtons'
import MenuButtons from './MenuButtons'
import MainButtons from './MainButtons'
import { useMealsFormsStoreMethods } from 'core/diets'

function Controls() {
  const mealsStoreMethods = useMealsFormsStoreMethods()

  return (
    <Flex width="100%" pt={3} alignItems="center">
      <Flex flex="4" justifyContent="space-between">
        <UndoRedoButtons />
      </Flex>

      <Flex flex="6" justifyContent="flex-end">
        <MenuButtons />

        <MainButtons
          onMealAdd={mealsStoreMethods.appendNewMealForm}
          onSave={() => {}}
        />
      </Flex>
    </Flex>
  )
}

export default Controls
