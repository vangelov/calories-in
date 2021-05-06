import { IconButton, ButtonGroup, chakra } from '@chakra-ui/react'
import { Copy, FileText, Settings } from 'react-feather'
import { Tooltip } from '@chakra-ui/react'

const CopyStyled = chakra(Copy)
const FileTextStyled = chakra(FileText)
const SettingsStyled = chakra(Settings)

function UtilityButtons() {
  return (
    <ButtonGroup spacing={1} variant="outline">
      <Tooltip hasArrow label="Export" aria-label="Export tooltip">
        <IconButton
          aria-label="export"
          icon={<FileTextStyled color="gray.400" pointerEvents="none" />}
        />
      </Tooltip>

      <Tooltip hasArrow label="Duplicate" aria-label="Undo tooltip">
        <IconButton
          aria-label="undo"
          icon={<CopyStyled color="gray.400" pointerEvents="none" />}
        />
      </Tooltip>

      <Tooltip hasArrow label="Settings" aria-label="Settings tooltip">
        <IconButton
          aria-label="settings"
          icon={<SettingsStyled color="gray.400" pointerEvents="none" />}
        />
      </Tooltip>
    </ButtonGroup>
  )
}

export default UtilityButtons
