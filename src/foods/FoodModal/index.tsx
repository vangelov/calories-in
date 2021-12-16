import { Modal, ModalOverlay } from '@chakra-ui/react'
import { Food } from 'foods'
import { useRef } from 'react'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  food?: Food
  onFoodCreatedOrUpdated?: (newFood: Food, oldFood?: Food) => void
  onFoodDeleted?: (food: Food) => void
}

function FoodModal({
  onClose,
  isOpen,
  food,
  onFoodCreatedOrUpdated,
  onFoodDeleted,
}: Props) {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const title = food ? 'Food Details' : 'Create Food'

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      initialFocusRef={!food ? nameInputRef : undefined}
      onClose={onClose}
      scrollBehavior="inside"
      size={food ? 'md' : 'lg'}
    >
      <ModalOverlay />

      <Content
        nameInputRef={nameInputRef}
        onClose={onClose}
        title={title}
        food={food}
        onFoodCreatedOrUpdated={onFoodCreatedOrUpdated}
        onFoodDeleted={onFoodDeleted}
      />
    </Modal>
  )
}

export type { Props }

export default FoodModal
