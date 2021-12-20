import { chakra, IconButton, Button } from '@chakra-ui/react'
import { useDietFormVersionsActions, useDietFormVersions } from 'undoRedo'
import { RotateCw } from 'react-feather'
import {
  getCtrlKeyName,
  TooltipCommandLabel,
  Tooltip,
  useScreenSize,
  ScreenSize,
} from 'general'

const RotateCwStyled = chakra(RotateCw)
const ctrlKeyName = getCtrlKeyName()

function RedoButton() {
  const { redo } = useDietFormVersionsActions()
  const { canRedo } = useDietFormVersions()
  const screenSize = useScreenSize()

  if (screenSize >= ScreenSize.Medium) {
    return (
      <Tooltip
        label={
          <TooltipCommandLabel
            command="Redo last change"
            kbdCombo={`${ctrlKeyName}+Shift+Z`}
          />
        }
      >
        <Button
          variant="solid"
          leftIcon={<RotateCwStyled size={16} pointerEvents="none" />}
          isDisabled={!canRedo}
          onClick={() => redo()}
        >
          Redo
        </Button>
      </Tooltip>
    )
  }

  return (
    <IconButton
      aria-label="Redo"
      variant="solid"
      icon={<RotateCwStyled size={20} pointerEvents="none" />}
      isDisabled={!canRedo}
      onClick={() => redo()}
    />
  )
}

export default RedoButton
