import { Flex } from '@chakra-ui/react'
import UndoRedoButtons from './UndoRedoButtons'
import MenuButtons from './MenuButtons'
import MainButtons from './MainButtons'

type Props = {
  onMealAdd: () => void
  onSave: () => void
}

function Controls({ onMealAdd, onSave }: Props) {
  return (
    <Flex width="100%" pt={3} alignItems="center">
      <Flex flex="4" justifyContent="space-between">
        <UndoRedoButtons />
      </Flex>

      <Flex flex="6" justifyContent="flex-end">
        <MenuButtons />

        <MainButtons onMealAdd={onMealAdd} onSave={onSave} />
      </Flex>
    </Flex>
  )
}

export default Controls
