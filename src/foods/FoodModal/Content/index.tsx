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
import { RefObject, useState } from 'react'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import useDeleteFood from './useDeleteFood'
import useSubmitFoodForm from './useSubmitFoodForm'

type Props = {
  onClose: () => void
  title: string
  nameInputRef: RefObject<HTMLInputElement>
  food?: Food
  onFoodCreatedOrUpdated?: (newFood: Food, oldFood?: Food) => void
  onFoodDeleted?: (food: Food) => void
}

function Content({
  onClose,
  nameInputRef,
  title,
  food,
  onFoodCreatedOrUpdated,
  onFoodDeleted,
}: Props) {
  const canEdit = Boolean(food && food.addedByUser)
  const deleteFood = useDeleteFood({ food, onClose, onFoodDeleted })
  const [isEditing, setIsEditing] = useState(!food)

  const { onSubmit } = useSubmitFoodForm({
    onComplete: (newOrUpdatedFood: Food) => {
      onFoodCreatedOrUpdated && onFoodCreatedOrUpdated(newOrUpdatedFood, food)
      onClose()
    },
  })

  function onToggleEdit() {
    setIsEditing(!isEditing)
  }

  return (
    <form onSubmit={onSubmit}>
      <ModalContent>
        <ModalHeader>
          {title}
          {canEdit && (
            <Button
              ml={3}
              variant="link"
              colorScheme="teal"
              onClick={onToggleEdit}
            >
              {isEditing ? 'Back to preview' : 'Edit food'}
            </Button>
          )}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormFields nameInputRef={nameInputRef} canEdit={isEditing} />

          {isEditing && food && (
            <Box>
              <Divider />
              <Button
                width="100%"
                my={3}
                colorScheme="red"
                onClick={deleteFood.onDelete}
              >
                Delete
              </Button>
            </Box>
          )}

          <DeleteConfirmationModal
            text="Deleting this food will remove it from all meal plans where it's being used."
            confirmButtonLabel="Delete food"
            isOpen={deleteFood.deleteConfirmationDisclosure.isOpen}
            onCancel={deleteFood.deleteConfirmationDisclosure.onClose}
            onConfirm={deleteFood.onConfirmDelete}
          />
        </ModalBody>

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
