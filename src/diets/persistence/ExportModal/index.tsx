import { Modal, ModalOverlay } from '@chakra-ui/react'
import Content from './Content'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function ExportModal({ isOpen, onClose }: Props) {
  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Content onClose={onClose} />
    </Modal>
  )
}

export default ExportModal
