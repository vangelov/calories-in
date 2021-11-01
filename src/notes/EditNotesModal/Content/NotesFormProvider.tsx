import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactNode } from 'react'
import { getNotesForm, NotesForm, notesFormSchema } from 'notes'

type Props = {
  children: ReactNode
  notes?: string
}

function NotesFormProvider({ children, notes }: Props) {
  const defaultValues = getNotesForm(notes)

  const formMethods = useForm<NotesForm>({
    defaultValues,
    mode: 'onChange',

    resolver: yupResolver(notesFormSchema),
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}

export default NotesFormProvider
