import { ButtonGroup } from '@chakra-ui/react'
import UndoButton from './UndoButton'
import RedoButton from './RedoButton'

function UndoRedoButtons() {
  return (
    <ButtonGroup spacing={2} variant="outline">
      <UndoButton />
      <RedoButton />
    </ButtonGroup>
  )
}

export default UndoRedoButtons
