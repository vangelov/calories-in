import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  text: string
  confirmButtonLabel: String
}

function DeleteConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
  text,
  confirmButtonLabel,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete food</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{text}</Text>
          <br />
          <Text fontWeight="medium">This action cannot be undone.</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme="red" ml={3} onClick={onConfirm}>
            {confirmButtonLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteConfirmationModal
