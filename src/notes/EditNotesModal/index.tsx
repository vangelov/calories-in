import { Modal, ModalOverlay, ModalProps } from '@chakra-ui/react'
import { useRef } from 'react'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  notes?: string
  onEditNotes: (notes?: string) => void
  fieldId: string
  ownerName: string
  textAreaHeight?: string | number
} & Omit<ModalProps, 'children'>

function EditNotesModal({
  onClose,
  isOpen,
  notes,
  onEditNotes,
  fieldId,
  ownerName,
  textAreaHeight,
  ...rest
}: Props) {
  const initialRef = useRef<HTMLInputElement>(null)
  const finalFocusRef = useRef(null)

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalFocusRef}
      {...rest}
    >
      <ModalOverlay />

      <Content
        onClose={onClose}
        onEditNotes={onEditNotes}
        initialRef={initialRef}
        fieldId={fieldId}
        notes={notes}
        ownerName={ownerName}
        textAreaHeight={textAreaHeight}
      />
    </Modal>
  )
}

export default EditNotesModal
