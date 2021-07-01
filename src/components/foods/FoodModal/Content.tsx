import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
  VStack,
} from '@chakra-ui/react'
import { Food } from 'core/types'
import { getFoodForm, useFoodForm, useSubmitFoodForm } from 'core/foods'
import { FormProvider } from 'react-hook-form'
import FoodFields from './FoodFields'
import { RefObject } from 'react'

type Props = {
  onClose: () => void
  title: string
  onSave: (food: Food) => void
  nameInputRef: RefObject<HTMLInputElement>
  food?: Food
  canEdit: boolean
}

function Content({
  onClose,
  nameInputRef,
  onSave,
  title,
  food,
  canEdit,
}: Props) {
  const foodForm = getFoodForm(food)
  const formMethods = useFoodForm(foodForm)

  const { onSubmit } = useSubmitFoodForm({
    formMethods,
    onComplete: (food: Food) => onSave(food),
  })

  return (
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <form onSubmit={onSubmit}>
          <FormProvider {...formMethods}>
            <FoodFields nameInputRef={nameInputRef} canEdit={canEdit} />
          </FormProvider>
        </form>
      </ModalBody>

      <ModalFooter>
        <VStack spacing={3}>
          <Button onClick={onClose}>Close</Button>
          {canEdit && (
            <Button colorScheme="teal" variant="solid" onClick={onSubmit}>
              Save
            </Button>
          )}
        </VStack>
      </ModalFooter>
    </ModalContent>
  )
}

export type { Props }

export default Content
