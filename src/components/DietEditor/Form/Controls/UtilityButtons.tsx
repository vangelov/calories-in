import { ButtonGroup, chakra } from '@chakra-ui/react'
import { Copy, FileText, Settings } from 'react-feather'
import { ResponsiveIconButton } from 'components/general'

const CopyStyled = chakra(Copy)
const FileTextStyled = chakra(FileText)
const SettingsStyled = chakra(Settings)

function UtilityButtons() {
  return (
    <ButtonGroup
      spacing={1}
      variant="outline"
      display={{ base: 'none', md: 'block' }}
    >
      <ResponsiveIconButton
        size="sm"
        aria-label="Export"
        icon={<FileTextStyled size={20} pointerEvents="none" />}
      />

      <ResponsiveIconButton
        aria-label="Duplicate"
        colorScheme="gray"
        icon={<CopyStyled size={20} pointerEvents="none" />}
      />

      <ResponsiveIconButton
        aria-label="settings"
        icon={<SettingsStyled size={20} pointerEvents="none" />}
      />
    </ButtonGroup>
  )
}

export default UtilityButtons
