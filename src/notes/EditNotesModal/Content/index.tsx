import { RefObject } from 'react'
import NotesFormProvider from './NotesFormProvider'
import Form from './Form'

type Props = {
  onClose: () => void
  initialRef: RefObject<HTMLInputElement>
  onEditNotes: (notes: string) => void
  fieldId: string
  ownerName: string
  notes?: string
}

function Content({
  ownerName,
  onClose,
  initialRef,
  onEditNotes,
  fieldId,
  notes,
}: Props) {
  return (
    <NotesFormProvider notes={notes}>
      <Form
        ownerName={ownerName}
        notes={notes}
        onClose={onClose}
        onEditNotes={onEditNotes}
        initialRef={initialRef}
        fieldId={fieldId}
      />
    </NotesFormProvider>
  )
}

export default Content
