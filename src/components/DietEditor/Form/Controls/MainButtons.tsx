import { Button, chakra } from '@chakra-ui/react'
import { useScreenSize } from 'components/general/ScreenSizeProvider'
import { Plus, Share } from 'react-feather'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'

const PlusStyled = chakra(Plus)

type Props = {
  onMealAdd: () => void
  onSave: () => void
}

function MainButtons({ onMealAdd, onSave }: Props) {
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
          isDisabled={true}
          mr={mr}
          onClick={onSave}
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
        onClick={onSave}
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
