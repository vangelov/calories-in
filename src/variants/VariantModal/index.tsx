import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import Content from './Content'
import {
  VariantNameFormSubmitAction,
  VariantFormMethodsProvider,
} from 'variants'

type Props = {
  onClose: () => void
  isOpen: boolean
  variantFormIndex?: number
  submitAction: VariantNameFormSubmitAction
}

function VariantNameModal({
  onClose,
  isOpen,
  variantFormIndex,
  submitAction,
}: Props) {
  const initialRef = useRef<HTMLInputElement>(null)
  const title =
    variantFormIndex !== undefined
      ? submitAction === 'rename'
        ? 'Rename Variant'
        : 'Copy Variant'
      : 'Add Variant'

  const finalFocusRef = useRef(null)

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalFocusRef}
    >
      <ModalOverlay />
      <VariantFormMethodsProvider variantFormIndex={variantFormIndex}>
        <Content
          title={title}
          onClose={onClose}
          initialRef={initialRef}
          variantFormIndex={variantFormIndex}
          submitAction={submitAction}
        />
      </VariantFormMethodsProvider>
    </Modal>
  )
}

export default VariantNameModal
