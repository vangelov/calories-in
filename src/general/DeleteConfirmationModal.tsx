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
}

function DeleteConfirmationModal({ isOpen, onCancel, onConfirm }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete food</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Deleting this food will remove it from all meal plans where it's
            being used.
          </Text>
          <br />
          <Text fontWeight="medium">This action cannot be undone.</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme="red" ml={3} onClick={onConfirm}>
            Delete food
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteConfirmationModal
