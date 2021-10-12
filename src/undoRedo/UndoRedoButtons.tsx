import { ButtonGroup, chakra } from '@chakra-ui/react'
import {
  useDietFormVersionsActions,
  useDietFormVersions,
} from './useDietFormVersionsStore'
import { CornerUpLeft, CornerUpRight } from 'react-feather'
import {
  ResponsiveIconButton,
  getCtrlKeyName,
  TooltipCommandLabel,
  Tooltip,
} from 'general'

const CornerUpLeftStyled = chakra(CornerUpLeft)
const CornerUpRightStyled = chakra(CornerUpRight)
const ctrlKeyName = getCtrlKeyName()

function UndoRedoButtons() {
  const { undo, redo } = useDietFormVersionsActions()
  const { canUndo, canRedo } = useDietFormVersions()

  return (
    <ButtonGroup spacing={2} variant="outline">
      <Tooltip
        label={
          <TooltipCommandLabel command="Undo" kbdCombo={`${ctrlKeyName}+Z`} />
        }
      >
        <ResponsiveIconButton
          aria-label="Undo"
          icon={<CornerUpLeftStyled size={20} pointerEvents="none" />}
          isDisabled={!canUndo}
          onClick={() => undo()}
        />
      </Tooltip>

      <Tooltip
        label={
          <TooltipCommandLabel
            command="Redo"
            kbdCombo={`${ctrlKeyName}+Shift+Z`}
          />
        }
      >
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
