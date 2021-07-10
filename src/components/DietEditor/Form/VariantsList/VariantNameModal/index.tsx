import { Modal, ModalOverlay } from '@chakra-ui/react'
import { VariantField, VariantNameFormProvider } from 'core/diets'
import { useRef } from 'react'
import Content from './Content'
import { VariantNameFormSubmitAction } from 'core/diets'

type Props = {
  onClose: () => void
  isOpen: boolean
  selectedVariantFieldIndex?: number
  variantsFields: VariantField[]
  variantField?: VariantField
  submitAction: VariantNameFormSubmitAction
}

function VariantNameModal({
  onClose,
  isOpen,
  variantField,
  submitAction,
}: Props) {
  const initialRef = useRef<HTMLInputElement>(null)
  const title = variantField
    ? submitAction === 'rename'
      ? 'Rename Variant'
      : 'Copy Variant'
    : 'Add Variant'

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      onClose={onClose}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <VariantNameFormProvider variantField={variantField}>
        <Content
          title={title}
          onClose={onClose}
          initialRef={initialRef}
          variantField={variantField}
          submitAction={submitAction}
        />
      </VariantNameFormProvider>
    </Modal>
  )
}

export default VariantNameModal
