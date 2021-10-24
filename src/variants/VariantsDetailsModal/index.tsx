import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import { VariantForm } from 'variants'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  initialVariantForm: VariantForm
}

function VariantsDetailsModal({ onClose, isOpen, initialVariantForm }: Props) {
  const selectInputRef = useRef<HTMLSelectElement>(null)

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      initialFocusRef={selectInputRef}
      onClose={onClose}
      scrollBehavior="inside"
      size="lg"
    >
      <ModalOverlay />

      <Content
        selectInputRef={selectInputRef}
        onClose={onClose}
        initialVariantForm={initialVariantForm}
      />
    </Modal>
  )
}

export type { Props }

export default VariantsDetailsModal
