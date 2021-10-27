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
import useSubmitFoodForm from './useSubmitFoodForm'

type Props = {
  onClose: () => void
  title: string
  nameInputRef: RefObject<HTMLInputElement>
  food?: Food
  canEdit: boolean

  isEditing: boolean
  onToggleEdit: () => void
  onDelete: () => void
  onFoodCreatedOrUpdated?: (newFood: Food, oldFood?: Food) => void
}

function Form({
  onClose,
  nameInputRef,
  title,
  food,
  canEdit,
  onFoodCreatedOrUpdated,
  isEditing,
  onToggleEdit,
  onDelete,
}: Props) {
  const { onSubmit } = useSubmitFoodForm({
    onComplete: (newOrUpdatedFood: Food) => {
      onFoodCreatedOrUpdated && onFoodCreatedOrUpdated(newOrUpdatedFood, food)
      onClose()
    },
  })

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
              <Button width="100%" my={3} colorScheme="red" onClick={onDelete}>
                Delete
              </Button>
            </Box>
          )}
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

export default Form
