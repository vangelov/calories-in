import { Button, chakra } from '@chakra-ui/react'
import { useScreenSize } from 'core/ScreenSizeProvider'
import { Plus, Save } from 'react-feather'
import { ResponsiveIconButton } from 'components/general'

const PlusStyled = chakra(Plus)
const SaveStyled = chakra(Save)

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
          leftIcon={
            <SaveStyled size={20} color="gray.400" pointerEvents="none" />
          }
          variant="outline"
          mr={mr}
          onClick={onSave}
        >
          Save
        </Button>
        <Button
          size="sm"
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
        aria-label="Save"
        icon={<SaveStyled size={20} color="gray.400" pointerEvents="none" />}
        variant="outline"
        onClick={onSave}
        mr={mr}
      />

      <ResponsiveIconButton
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
