import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useEffect } from 'react'
import Content from './Content'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function ExportModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    import('./Content/Exporter')
  }, [])

  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Content onClose={onClose} />
    </Modal>
  )
}

export default ExportModal
