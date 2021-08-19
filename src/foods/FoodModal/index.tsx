import { Modal, ModalOverlay } from '@chakra-ui/react'
import { FoodFormMethodsProvider } from 'foods'
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

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      initialFocusRef={!food ? nameInputRef : undefined}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <FoodFormMethodsProvider food={food}>
        <Content
          nameInputRef={nameInputRef}
          onClose={onClose}
          title={title}
          food={food}
          onFoodCreatedOrUpdated={onFoodCreatedOrUpdated}
        />
      </FoodFormMethodsProvider>
    </Modal>
  )
}

export type { Props }

export default FoodModal
