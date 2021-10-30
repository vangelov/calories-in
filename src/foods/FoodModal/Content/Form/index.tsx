import {
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Button,
  Divider,
  Box,
  VStack,
} from '@chakra-ui/react'
import { Food } from 'foods'
import { RefObject } from 'react'
import useSubmitFoodForm from './useSubmitFoodForm'
import { StatFormField } from 'stats'
import Footer from './Footer'
import Header from './Header'
import Tabs from './Tabs'

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
        <Header
          title={title}
          canEdit={canEdit}
          isEditing={isEditing}
          onClose={onClose}
          onToggleEdit={onToggleEdit}
        />
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6} align="stretch\">
            <VStack spacing={2} align="stretch">
              <StatFormField
                textInputRef={nameInputRef}
                name="name"
                label="Name"
                inputType="text"
                isRequired={true}
                isReadOnly={!isEditing}
                hasDivider={false}
              />
              <StatFormField
                name="categoryId"
                label="Category"
                inputType="foodCategory"
                isRequired={true}
                isReadOnly={!isEditing}
              />
            </VStack>

            <Tabs
              nameInputRef={nameInputRef}
              isEditing={isEditing}
              food={food}
            />
          </VStack>

          {isEditing && food && (
            <Box>
              <Divider />
              <Button width="100%" my={3} colorScheme="red" onClick={onDelete}>
                Delete
              </Button>
            </Box>
          )}
        </ModalBody>

        <Footer onClose={onClose} onSubmit={onSubmit} isEditing={isEditing} />
      </ModalContent>
    </form>
  )
}

export type { Props }

export default Form
