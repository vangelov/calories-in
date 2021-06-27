import {
  Modal,
  ModalOverlay,
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
import { useRef } from 'react'

type Props = {
  onClose: () => void
  isOpen: boolean
  title: string
  onSave: (food: Food) => void
}

function FoodModal({ onClose, isOpen, onSave, title }: Props) {
  const formMethods = useFoodForm(getFoodForm())
  const nameInputRef = useRef<HTMLInputElement>(null)

  const { onSubmit } = useSubmitFoodForm({
    formMethods,
    onComplete: (food: Food) => onSave(food),
  })

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      initialFocusRef={nameInputRef}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
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
    </Modal>
  )
}

export type { Props }

export default FoodModal
