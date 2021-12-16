import { Modal, ModalOverlay } from '@chakra-ui/react'
import { VariantForm } from 'variants'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  initialVariantForm: VariantForm
}

function VariantsDetailsModal({ onClose, isOpen, initialVariantForm }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      onClose={onClose}
      scrollBehavior="inside"
      size="md"
    >
      <ModalOverlay />

      <Content onClose={onClose} initialVariantForm={initialVariantForm} />
    </Modal>
  )
}

export type { Props }

export default VariantsDetailsModal
