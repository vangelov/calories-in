import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
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
}

function Content({ onClose, nameInputRef, onSave, title }: Props) {
  const formMethods = useFoodForm(getFoodForm())

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
            <FoodFields nameInputRef={nameInputRef} />
          </FormProvider>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Close
        </Button>
        <Button colorScheme="teal" variant="solid" onClick={onSubmit}>
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export type { Props }

export default Content
