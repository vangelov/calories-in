import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react'
import { VariantField } from 'core/diets'
import { useRef } from 'react'
import BodyAndFooter from './BodyAndFooter'

type Props = {
  onClose: () => void
  isOpen: boolean
  title: string
  variantField?: VariantField
  onSave: (name: string) => void
  existingVariantsNames: string[]
}

function VariantNameModal({
  onClose,
  isOpen,
  onSave,
  title,
  existingVariantsNames,
}: Props) {
  const initialRef = useRef<HTMLInputElement>(null)

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
        <BodyAndFooter
          onClose={onClose}
          onSave={onSave}
          initialRef={initialRef}
          existingVariantsNames={existingVariantsNames}
        />
      </ModalContent>
    </Modal>
  )
}

export default VariantNameModal
