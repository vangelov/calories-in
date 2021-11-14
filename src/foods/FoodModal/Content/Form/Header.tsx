import { ModalHeader, Button } from '@chakra-ui/react'

type Props = {
  onClose: () => void
  title: string
  canEdit: boolean
  onToggleEdit: () => void
  isEditing: boolean
}

function Header({ title, canEdit, isEditing, onToggleEdit }: Props) {
  return (
    <ModalHeader>
      {title}
      {canEdit && (
        <Button
          ml={3}
          variant="link"
          size="md"
          colorScheme="teal"
          onClick={onToggleEdit}
        >
          {isEditing ? 'Back to preview' : 'Edit food'}
        </Button>
      )}
    </ModalHeader>
  )
}

export default Header
