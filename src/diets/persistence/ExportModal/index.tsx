import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useEffect } from 'react'
import Content from './Content'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function ExportModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    setTimeout(() => {
      import('./Content/Exporter')
    }, 5000)
  }, [])

  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Content onClose={onClose} />
    </Modal>
  )
}

export default ExportModal
