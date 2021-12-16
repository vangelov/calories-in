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
  onClose: () => void
  onImport: () => void
}

function MissingFoodsModal({ isOpen, onClose, onImport }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
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
          <Button onClick={onClose} mr={3}>
            Continue
          </Button>

          <Button
            variant="solid"
            colorScheme="teal"
            onClick={() => {
              onImport()
              onClose()
            }}
          >
            Import foods
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default MissingFoodsModal
