import {
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  Input,
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
import useSubmitVariantNameForm from './useSubmitVariantNameForm'
import { useFormError, useSelectInputText } from 'form'

type Props = {
  title: string
  onClose: () => void
  initialRef: RefObject<HTMLInputElement>
  variantFormIndex: number
}

function Content({ title, onClose, initialRef, variantFormIndex }: Props) {
  const { register } = useFormContext()
  const nameRegister = register('name')
  const nameInputRef = useMergeRefs(nameRegister.ref, initialRef)

  const onSubmit = useSubmitVariantNameForm({
    variantFormIndex,
    onComplete: onClose,
  })

  const { errorMessage, isInvalid } = useFormError('name')

  useSelectInputText(initialRef)

  return (
    <form onSubmit={onSubmit}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl isInvalid={isInvalid}>
            <FormLabel>Name</FormLabel>
            <Input
              autoComplete="off"
              {...nameRegister}
              ref={nameInputRef}
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
            Rename
          </Button>
        </ModalFooter>
      </ModalContent>
    </form>
  )
}

export default Content
