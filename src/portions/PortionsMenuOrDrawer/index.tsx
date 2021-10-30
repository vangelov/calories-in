import { useScreenSize, ScreenSize } from 'general'
import Drawer from './Drawer'
import Trigger from './Trigger'
import { useDisclosure } from '@chakra-ui/hooks'
import Menu from './Menu'
import { Portion, usePortions } from 'portions'
import { Food } from 'foods'

type Props = {
  onPortionChange: (portion: Portion) => void
  selectedPortionId: string
  food: Food
}

function PortionsMenuOrDrawer({
  food,
  onPortionChange,
  selectedPortionId,
}: Props) {
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()
  const { allPortions, weightBasedPortions } = usePortions()
  const portions = food.volume ? allPortions : weightBasedPortions

  if (screenSize < ScreenSize.Medium) {
    return (
      <>
        <Trigger
          selectedPortionId={selectedPortionId}
          onClick={modalDisclosure.onOpen}
        />
        <Drawer
          portions={portions}
          onChange={onPortionChange}
          selectedPortionId={selectedPortionId}
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </>
    )
  }
  return (
    <Menu
      portions={portions}
      onChange={onPortionChange}
      selectedPortionId={selectedPortionId}
    />
  )
}

export default PortionsMenuOrDrawer
