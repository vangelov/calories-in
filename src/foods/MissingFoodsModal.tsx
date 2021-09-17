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
}

function MissingFoodsModal({ isOpen, onCancel }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Missing foods</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="medium">
            The meal plan you contains foods that are not part of your list.
          </Text>
          <br />
          <Text>
            You can try to import the missing foods or continue without them.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onCancel} mr={3}>
            Import foods
          </Button>

          <Button variant="solid" colorScheme="teal" onClick={onCancel}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default MissingFoodsModal
