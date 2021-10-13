import {
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  Textarea,
  FormLabel,
  FormErrorMessage,
  ModalContent,
  ModalHeader,
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

type Props = {
  title: string
  onClose: () => void
  initialRef: RefObject<HTMLInputElement>
  onEditNotes: (notes: string) => void
  fieldId: string
}

function Content({ title, onClose, initialRef, onEditNotes, fieldId }: Props) {
  const { register, handleSubmit } = useFormContext()
  const notesRegister = register('notes')
  const notesInputRef = useMergeRefs(notesRegister.ref, initialRef)
  const oneTimeCheckActions = useOneTimeCheckActions()

  const onSubmit = handleSubmit((form: NotesForm) => {
    oneTimeCheckActions.set(`notes-${fieldId}`)
    onEditNotes(form.notes)
    onClose()
  })

  const { errorMessage, isInvalid } = useFormError('name')

  return (
    <form onSubmit={onSubmit}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl isInvalid={isInvalid}>
            <FormLabel>Name</FormLabel>
            <Textarea
              autoComplete="off"
              {...notesRegister}
              ref={notesInputRef}
              focusBorderColor={isInvalid ? 'red.500' : undefined}
              placeholder="Enter name"
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

export default Content
