import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import Content from './Content'
import VariantNameFormProvider from './VariantNameFormProvider'

type Props = {
  onClose: () => void
  isOpen: boolean
  variantFormIndex: number
}

function VariantNameModal({ onClose, isOpen, variantFormIndex }: Props) {
  const initialRef = useRef<HTMLInputElement>(null)
  const finalFocusRef = useRef(null)

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalFocusRef}
      size="sm"
    >
      <ModalOverlay />
      <VariantNameFormProvider variantFormIndex={variantFormIndex}>
        <Content
          title="Rename Day"
          onClose={onClose}
          initialRef={initialRef}
          variantFormIndex={variantFormIndex}
        />
      </VariantNameFormProvider>
    </Modal>
  )
}

export * from './variantNameForm'
export * from './useSubmitVariantNameForm'

export default VariantNameModal
