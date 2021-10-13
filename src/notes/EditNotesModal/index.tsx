import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import Content from './Content'
import NotesFormProvider from './NotesFormProvider'

type Props = {
  onClose: () => void
  isOpen: boolean
  notes?: string
  onEditNotes: (notes: string) => void
}

function EditNotesModal({ onClose, isOpen, notes, onEditNotes }: Props) {
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
          title="Notes"
          onClose={onClose}
          onEditNotes={onEditNotes}
          initialRef={initialRef}
        />
      </NotesFormProvider>
    </Modal>
  )
}

export * from './notesForm'

export default EditNotesModal
