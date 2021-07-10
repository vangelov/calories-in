import { Modal, ModalOverlay } from '@chakra-ui/react'
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
  const title = food ? (canEdit ? 'Edit food' : 'Food details') : 'Create food'

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      initialFocusRef={canEdit ? nameInputRef : undefined}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <Content
        nameInputRef={nameInputRef}
        onClose={onClose}
        title={title}
        food={food}
        canEdit={canEdit}
      />
    </Modal>
  )
}

export type { Props }

export default FoodModal
