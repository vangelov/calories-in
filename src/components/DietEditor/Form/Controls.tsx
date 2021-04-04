import { Flex, Button } from '@chakra-ui/react'
import { useUndoRedoMethods, useUndoRedoState } from 'core/undoRedo'

type Props = {
  onMealAdd: () => void
}

function Controls({ onMealAdd }: Props) {
  const { undo, redo } = useUndoRedoMethods()
  const { canUndo, canRedo } = useUndoRedoState()

  function onUndo() {
    undo()
  }

  function onRedo() {
    redo()
  }

  return (
    <Flex
      padding={2}
      height="40px"
      width="100%"
      alignItems="center"
      backgroundColor="brown"
    >
      <Button onClick={onMealAdd}>Add Meal</Button>
      <Button isDisabled={!canUndo} onClick={onUndo}>
        Undo
      </Button>
      <Button isDisabled={!canRedo} onClick={onRedo}>
        Redo
      </Button>
    </Flex>
  )
}

export default Controls
