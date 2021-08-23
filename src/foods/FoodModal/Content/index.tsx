import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
  HStack,
  Divider,
  Box,
} from '@chakra-ui/react'
import { Food } from 'foods'
import FormFields from './FormFields'
import { RefObject } from 'react'
import { DeleteConfirmationModal } from 'general'
import useActions from './useActions'

type Props = {
  onClose: () => void
  title: string
  nameInputRef: RefObject<HTMLInputElement>
  food?: Food
  onFoodCreatedOrUpdated: (newFood: Food, oldFood?: Food) => void
}

function Content({
  onClose,
  nameInputRef,
  title,
  food,
  onFoodCreatedOrUpdated,
}: Props) {
  const actions = useActions({ food, onFoodCreatedOrUpdated, onClose })
  const canEdit = Boolean(food && food.addedByUser)

  return (
    <form onSubmit={actions.onSubmit}>
      <ModalContent>
        <ModalHeader>
          {title}
          {canEdit && (
            <Button
              ml={3}
              variant="link"
              colorScheme="teal"
              onClick={actions.onToggleEdit}
            >
              {actions.isEditing ? 'Back to preview' : 'Edit food'}
            </Button>
          )}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormFields nameInputRef={nameInputRef} canEdit={actions.isEditing} />

          {actions.isEditing && food && (
            <Box>
              <Divider />
              <Button
                width="100%"
                my={3}
                colorScheme="red"
                onClick={actions.onDelete}
              >
                Delete
              </Button>
            </Box>
          )}

          <DeleteConfirmationModal
            isOpen={actions.deleteConfirmationDisclosure.isOpen}
            onCancel={actions.deleteConfirmationDisclosure.onClose}
            onConfirm={actions.onConfirmDelete}
          />
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button onClick={onClose}>Close</Button>
            {actions.isEditing && (
              <Button
                colorScheme="teal"
                type="submit"
                variant="solid"
                onClick={actions.onSubmit}
              >
                Save
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </form>
  )
}

export type { Props }

export default Content
