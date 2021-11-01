import { object, string } from 'yup'

type NotesForm = {
  notes: string
}

function getNotesForm(notes?: string): NotesForm {
  return {
    notes: notes || '',
  }
}

const notesFormSchema = object().shape({
  name: string(),
})

export { getNotesForm, notesFormSchema }

export type { NotesForm }
