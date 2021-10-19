import { Button } from '@chakra-ui/react'
import { Share } from 'react-feather'
import { ResponsiveIconButton, useScreenSize, ScreenSize } from 'general'

type Props = {
  onExport: () => void
  canExport: boolean
}

function MainButtons({ onExport, canExport }: Props) {
  const screenSize = useScreenSize()

  if (screenSize >= ScreenSize.Medium) {
    return (
      <>
        <Button
          size="sm"
          isDisabled={!canExport}
          leftIcon={<Share size={20} pointerEvents="none" />}
          variant="solid"
          colorScheme="teal"
          onClick={onExport}
        >
          Export
        </Button>
      </>
    )
  }

  return (
    <>
      <ResponsiveIconButton
        aria-label="Export"
        icon={<Share size={20} pointerEvents="none" />}
        variant="solid"
        onClick={onExport}
        colorScheme="teal"
      />
    </>
  )
}

export default MainButtons
