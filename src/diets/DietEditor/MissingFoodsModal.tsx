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

function MissingFoodsModal({ isOpen, onCancel, onConfirm }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Missing foods</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            The meal plan you are trying to import contains foods that are not
            part of your list.
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

export default MissingFoodsModal
