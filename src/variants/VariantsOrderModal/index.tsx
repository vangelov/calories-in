import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
}

function VariantsOrderModal({ onClose, isOpen }: Props) {
  const selectInputRef = useRef<HTMLSelectElement>(null)

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      initialFocusRef={selectInputRef}
      onClose={onClose}
      scrollBehavior="inside"
      size="sm"
    >
      <ModalOverlay />

      <Content onClose={onClose} />
    </Modal>
  )
}

export type { Props }

export default VariantsOrderModal
