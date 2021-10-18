import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import Content from './Content'
import NotesFormProvider from './NotesFormProvider'
import Header from './Header'

type Props = {
  onClose: () => void
  isOpen: boolean
  notes?: string
  onEditNotes: (notes: string) => void
  fieldId: string
  ownerName: string
}

function EditNotesModal({
  onClose,
  isOpen,
  notes,
  onEditNotes,
  fieldId,
  ownerName,
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
    >
      <ModalOverlay />
      <NotesFormProvider notes={notes}>
        <Content
          header={<Header ownerName={ownerName} notes={notes} />}
          onClose={onClose}
          onEditNotes={onEditNotes}
          initialRef={initialRef}
          fieldId={fieldId}
        />
      </NotesFormProvider>
    </Modal>
  )
}

export * from './notesForm'

export default EditNotesModal
