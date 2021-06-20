import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  FormLabel,
} from '@chakra-ui/react'
import { useRef } from 'react'

type Props = {
  onClose: () => void
  isOpen: boolean
  onSave: (name: string) => void
}

function VariantNameModal({ onClose, isOpen, onSave }: Props) {
  const initialRef = useRef<HTMLInputElement>(null)

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Variant</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Variant name</FormLabel>
            <Input ref={initialRef} placeholder="First name" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => {
              onSave('V3')
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default VariantNameModal
