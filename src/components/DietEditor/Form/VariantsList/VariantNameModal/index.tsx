import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react'
import { VariantField, VariantNameFormProvider } from 'core/diets'
import { useRef } from 'react'
import BodyAndFooter from './BodyAndFooter'
import { Action } from './types'

type Props = {
  onClose: () => void
  isOpen: boolean
  selectedVariantFieldIndex?: number
  variantsFields: VariantField[]
  action: Action
}

function VariantNameModal({
  onClose,
  isOpen,
  variantsFields,
  selectedVariantFieldIndex,
  action,
}: Props) {
  const initialRef = useRef<HTMLInputElement>(null)

  let title = 'Add Variant'

  if (action === 'copy') {
    title = 'Copy'
  } else if (action === 'rename') {
    title = 'Rename'
  }

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      onClose={onClose}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <VariantNameFormProvider>
          <BodyAndFooter
            onClose={onClose}
            initialRef={initialRef}
            variantsFields={variantsFields}
            selectedVariantFieldIndex={selectedVariantFieldIndex}
            action={action}
          />
        </VariantNameFormProvider>
      </ModalContent>
    </Modal>
  )
}

export type { Action }

export default VariantNameModal
