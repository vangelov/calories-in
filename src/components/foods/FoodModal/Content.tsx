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
import { Food } from 'core/types'
import { useSubmitFoodForm } from 'core/foods'
import FoodFields from './FoodFields'
import { RefObject, useState } from 'react'

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
  const { onSubmit } = useSubmitFoodForm({
    onComplete: (newOrUpdatedFood: Food) => {
      onFoodCreatedOrUpdated(newOrUpdatedFood, food)
      onClose()
    },
  })

  const canEdit = Boolean(food && food.addedByUser)
  const [isEditing, setIsEditing] = useState(!food)

  return (
    <ModalContent>
      <ModalHeader>
        {title}
        {canEdit && (
          <Button
            ml={3}
            variant="link"
            colorScheme="teal"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Back to preview' : 'Edit food'}
          </Button>
        )}
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <form onSubmit={onSubmit}>
          <FoodFields nameInputRef={nameInputRef} canEdit={isEditing} />
        </form>

        {isEditing && (
          <Box>
            <Divider />
            <Button width="100%" my={3} colorScheme="red" onClick={onClose}>
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
  )
}

export type { Props }

export default Content
