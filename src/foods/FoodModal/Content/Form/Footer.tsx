import { ModalFooter, Button, HStack } from '@chakra-ui/react'

type Props = {
  onClose: () => void
  onSubmit: () => void
  isEditing: boolean
}

function Footer({ onClose, onSubmit, isEditing }: Props) {
  return (
    <ModalFooter>
      <HStack spacing={3}>
        <Button onClick={onClose}>Close</Button>
        {isEditing && (
          <Button
            colorScheme="teal"
            type="submit"
            variant="solid"
            onClick={onSubmit}
          >
            Save food
          </Button>
        )}
      </HStack>
    </ModalFooter>
  )
}

export default Footer
