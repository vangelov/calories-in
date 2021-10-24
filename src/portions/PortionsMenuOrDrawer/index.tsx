import { useScreenSize, ScreenSize } from 'general'
import Drawer from './Drawer'
import Trigger from './Trigger'
import { useDisclosure } from '@chakra-ui/hooks'
import Menu from './Menu'
import { Portion } from 'portions'

type Props = {
  onPortionChange: (portion: Portion) => void
  selectedPortionId: string
}

function PortionsMenuOrDrawer({ onPortionChange, selectedPortionId }: Props) {
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()

  if (screenSize < ScreenSize.Medium) {
    return (
      <>
        <Trigger
          selectedPortionId={selectedPortionId}
          onClick={modalDisclosure.onOpen}
        />
        <Drawer
          onChange={onPortionChange}
          selectedPortionId={selectedPortionId}
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </>
    )
  }
  return (
    <Menu onChange={onPortionChange} selectedPortionId={selectedPortionId} />
  )
}

export default PortionsMenuOrDrawer
