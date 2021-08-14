import { Modal, ModalOverlay } from '@chakra-ui/react'
import { FoodFormProvider } from 'foods'
import { Food } from 'foods'
import { useRef } from 'react'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  food?: Food
  onFoodCreatedOrUpdated: (newFood: Food, oldFood?: Food) => void
}

function FoodModal({ onClose, isOpen, food, onFoodCreatedOrUpdated }: Props) {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const title = food ? 'Food Details' : 'Create Food'

  console.log('food', food)

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      initialFocusRef={!food ? nameInputRef : undefined}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <FoodFormProvider food={food}>
        <Content
          nameInputRef={nameInputRef}
          onClose={onClose}
          title={title}
          food={food}
          onFoodCreatedOrUpdated={onFoodCreatedOrUpdated}
        />
      </FoodFormProvider>
    </Modal>
  )
}

export type { Props }

export default FoodModal
