import { ButtonGroup, chakra } from '@chakra-ui/react'
import { useUndoRedoMethods, useUndoRedoState } from 'core/undoRedo'
import { CornerUpLeft, CornerUpRight } from 'react-feather'
import { ResponsiveIconButton } from 'components/general'
import { useScreenSize } from 'core/ScreenSizeProvider'

const CornerUpLeftStyled = chakra(CornerUpLeft)
const CornerUpRightStyled = chakra(CornerUpRight)

function UndoRedoButtons() {
  const { undo, redo } = useUndoRedoMethods()
  const { canUndo, canRedo } = useUndoRedoState()
  const screenSize = useScreenSize()
  const spacing = screenSize >= 2 ? 1 : 2

  return (
    <ButtonGroup spacing={spacing} variant="outline">
      <ResponsiveIconButton
        aria-label="Undo"
        icon={
          <CornerUpLeftStyled size={20} color="gray.400" pointerEvents="none" />
        }
        isDisabled={!canUndo}
        onClick={() => undo()}
      />

      <ResponsiveIconButton
        aria-label="Redo"
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
    </ButtonGroup>
  )
}

export default UndoRedoButtons
