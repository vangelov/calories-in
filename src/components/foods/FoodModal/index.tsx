import { Modal, ModalOverlay } from '@chakra-ui/react'
import FoodFormProvider from 'core/foods/FoodFormProvider'
import { Food } from 'core/types'
import { useRef } from 'react'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  food?: Food
  canEdit?: boolean
}

function FoodModal({ onClose, isOpen, food, canEdit = true }: Props) {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const title = food ? (canEdit ? 'Edit Food' : 'Food Details') : 'Create Food'

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      initialFocusRef={canEdit ? nameInputRef : undefined}
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
          canEdit={canEdit}
        />
      </FoodFormProvider>
    </Modal>
  )
}

export type { Props }

export default FoodModal
