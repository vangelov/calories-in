import { IconButton, ButtonGroup, chakra } from '@chakra-ui/react'
import { useUndoRedoMethods, useUndoRedoState } from 'core/undoRedo'
import { CornerUpLeft, CornerUpRight } from 'react-feather'
import { Tooltip } from '@chakra-ui/react'

const CornerUpLeftStyled = chakra(CornerUpLeft)
const CornerUpRightStyled = chakra(CornerUpRight)

function UndoRedo() {
  const { undo, redo } = useUndoRedoMethods()
  const { canUndo, canRedo } = useUndoRedoState()

  return (
    <ButtonGroup spacing={1} variant="outline">
      <Tooltip hasArrow label="Undo" aria-label="A tooltip">
        <IconButton
          size="sm"
          aria-label="undo"
          icon={
            <CornerUpLeftStyled
              size={20}
              color="gray.400"
              pointerEvents="none"
            />
          }
          isDisabled={!canUndo}
          onClick={() => undo()}
        />
      </Tooltip>

      <Tooltip hasArrow label="Redo" aria-label="A tooltip">
        <IconButton
          size="sm"
          aria-label="test"
          icon={
            <CornerUpRightStyled
              size={20}
              color="gray.400"
              pointerEvents="none"
            />
          }
          isDisabled={!canRedo}
          onClick={() => redo()}
        />
      </Tooltip>
    </ButtonGroup>
  )
}

export default UndoRedo
