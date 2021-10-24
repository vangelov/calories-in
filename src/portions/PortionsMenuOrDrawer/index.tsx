import { useScreenSize, ScreenSize } from 'general'
import Drawer from './Drawer'
import Trigger from './Trigger'
import { useDisclosure } from '@chakra-ui/hooks'
import Menu from './Menu'
import { Portion } from 'portions'

type Props = {
  onPortionSelect: (portion: Portion) => void
  selectedPortionId: string
}

function PortionsMenuOrDrawer({ onPortionSelect, selectedPortionId }: Props) {
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()

  if (screenSize < ScreenSize.Medium) {
    return (
      <>
        <Trigger onClick={modalDisclosure.onOpen} />
        <Drawer
          onSelect={onPortionSelect}
          selectedPortionId={selectedPortionId}
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </>
    )
  }
  return (
    <Menu onSelect={onPortionSelect} selectedPortionId={selectedPortionId} />
  )
}

export default PortionsMenuOrDrawer
