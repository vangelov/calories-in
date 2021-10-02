import { ButtonGroup, chakra } from '@chakra-ui/react'
import { useFormVersionsActions, useFormVersions } from 'general/formVersions'
import { CornerUpLeft, CornerUpRight } from 'react-feather'
import { ResponsiveIconButton } from 'general'
import Tooltip from 'general/Tooltip'

const CornerUpLeftStyled = chakra(CornerUpLeft)
const CornerUpRightStyled = chakra(CornerUpRight)

function UndoRedoButtons() {
  const { undo, redo } = useFormVersionsActions()
  const { canUndo, canRedo } = useFormVersions()

  return (
    <ButtonGroup spacing={2} variant="outline">
      <Tooltip label="Undo">
        <ResponsiveIconButton
          aria-label="Undo"
          icon={<CornerUpLeftStyled size={20} pointerEvents="none" />}
          isDisabled={!canUndo}
          onClick={() => undo()}
        />
      </Tooltip>

      <Tooltip label="Redo">
        <ResponsiveIconButton
          aria-label="Redo"
          icon={<CornerUpRightStyled size={20} pointerEvents="none" />}
          isDisabled={!canRedo}
          onClick={() => redo()}
        />
      </Tooltip>
    </ButtonGroup>
  )
}

export default UndoRedoButtons
