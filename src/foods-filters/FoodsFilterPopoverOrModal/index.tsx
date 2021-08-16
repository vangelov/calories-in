import { useScreenSize } from 'general'
import Modal from './Modal'
import Trigger from './Trigger'
import Popover from './Popover'
import { useDisclosure } from '@chakra-ui/hooks'

function FoodsFilterPopoverOrModal() {
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()

  if (screenSize < 2) {
    return (
      <>
        <Trigger onClick={modalDisclosure.onOpen} />
        <Modal
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </>
    )
  }

  return <Popover />
}

export default FoodsFilterPopoverOrModal
