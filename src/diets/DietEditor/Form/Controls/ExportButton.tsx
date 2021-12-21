import { ScreenSize, useScreenSize } from 'general'
import { Button, ButtonProps, IconButton } from '@chakra-ui/react'
import { Share } from 'react-feather'
import { canExportDietForm } from 'diets/persistence'
import { useDietForm } from 'diets'

type Props = {} & ButtonProps

function ExportButton({ ...rest }: Props) {
  const screenSize = useScreenSize()
  const dietForm = useDietForm()
  const canExport = canExportDietForm(dietForm)

  const commonProps: ButtonProps = {
    isDisabled: !canExport,
    ...rest,
  }

  if (screenSize >= ScreenSize.Medium) {
    return (
      <Button
        leftIcon={<Share size={16} pointerEvents="none" />}
        variant="solid"
        colorScheme="teal"
        size="md"
        {...commonProps}
      >
        Export
      </Button>
    )
  }

  return (
    <IconButton
      isDisabled={!canExport}
      aria-label="Export"
      colorScheme="teal"
      size="md"
      icon={<Share size={20} pointerEvents="none" />}
      {...commonProps}
    />
  )
}

export default ExportButton
