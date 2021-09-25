import { Button, chakra } from '@chakra-ui/react'
import { Plus, Share } from 'react-feather'
import { ResponsiveIconButton, useScreenSize } from 'general'

const PlusStyled = chakra(Plus)

type Props = {
  onMealAdd: () => void

  onExport: () => void
}

function MainButtons({ onMealAdd, onExport }: Props) {
  const screenSize = useScreenSize()
  const mr = screenSize >= 2 ? 1 : 2

  if (screenSize >= 2) {
    return (
      <>
        <Button
          size="sm"
          leftIcon={<Share size={20} pointerEvents="none" />}
          variant="outline"
          colorScheme="teal"
          mr={mr}
          onClick={onExport}
        >
          Export
        </Button>
        <Button
          size="sm"
          colorScheme="teal"
          leftIcon={<PlusStyled size={20} color="white" pointerEvents="none" />}
          variant="solid"
          onClick={onMealAdd}
        >
          Add Meal
        </Button>
      </>
    )
  }

  return (
    <>
      <ResponsiveIconButton
        aria-label="Export"
        icon={<Share size={20} pointerEvents="none" />}
        variant="outline"
        onClick={onExport}
        colorScheme="teal"
        mr={mr}
      />

      <ResponsiveIconButton
        colorScheme="teal"
        size="md"
        aria-label="Add meal"
        icon={<PlusStyled size={20} color="white" pointerEvents="none" />}
        variant="solid"
        onClick={onMealAdd}
      />
    </>
  )
}

export default MainButtons
