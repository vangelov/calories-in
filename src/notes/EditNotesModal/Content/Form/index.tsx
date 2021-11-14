import {
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  Textarea,
  FormLabel,
  FormErrorMessage,
  ModalContent,
  ModalCloseButton,
  Collapse,
  Box,
} from '@chakra-ui/react'
import { RefObject } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMergeRefs } from '@chakra-ui/react'
import { useFormError } from 'form'
import { NotesForm } from 'notes'
import { useOneTimeCheckActions } from 'general'
import Header from './Header'

type Props = {
  onClose: () => void
  initialRef: RefObject<HTMLInputElement>
  onEditNotes: (notes?: string) => void
  fieldId: string
  ownerName: string
  notes?: string
  textAreaHeight?: string | number
}

function Form({
  ownerName,
  notes,
  onClose,
  initialRef,
  onEditNotes,
  fieldId,
  textAreaHeight,
}: Props) {
  const { register, handleSubmit } = useFormContext()
  const notesRegister = register('notes')
  const notesInputRef = useMergeRefs(notesRegister.ref, initialRef)
  const oneTimeCheckActions = useOneTimeCheckActions()

  const onSubmit = handleSubmit((form: NotesForm) => {
    oneTimeCheckActions.set(`notes-${fieldId}`)
    onEditNotes(form.notes || undefined)
    onClose()
  })

  const { errorMessage, isInvalid } = useFormError('name')

  return (
    <form onSubmit={onSubmit}>
      <ModalContent>
        <Header ownerName={ownerName} notes={notes} />
        <ModalCloseButton />

        <ModalBody>
          <FormControl isInvalid={isInvalid}>
            <FormLabel>Notes</FormLabel>
            <Textarea
              autoComplete="off"
              {...notesRegister}
              ref={notesInputRef}
              focusBorderColor={isInvalid ? 'red.500' : undefined}
              placeholder="Enter notes"
              height={textAreaHeight}
            />
            <Collapse animateOpacity={true} in={Boolean(errorMessage)}>
              <Box minHeight="21px">
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
              </Box>
            </Collapse>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            type="submit"
            colorScheme="teal"
            variant="solid"
            onClick={onSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </form>
  )
}

export default Form
