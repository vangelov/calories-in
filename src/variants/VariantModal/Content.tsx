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
} from '@chakra-ui/react'
import { RefObject } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMergeRefs } from '@chakra-ui/react'
import { useSubmitVariantForm, VariantNameFormSubmitAction } from 'variants'

type Props = {
  title: string
  onClose: () => void
  initialRef: RefObject<HTMLInputElement>
  variantFormIndex?: number
  submitAction: VariantNameFormSubmitAction
}

function Content({
  title,
  onClose,
  initialRef,
  submitAction,
  variantFormIndex,
}: Props) {
  const { register, formState } = useFormContext()
  const nameRegister = register('name')
  const nameInputRef = useMergeRefs(nameRegister.ref, initialRef)
  const { errors, touchedFields } = formState

  const onSubmit = useSubmitVariantForm({
    variantFormIndex,
    submitAction,
    onComplete: onClose,
  })

  const isInvalid =
    errors['name'] !== undefined &&
    (touchedFields['name'] || formState.isSubmitted)

  return (
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={isInvalid}>
            <FormLabel>Variant name</FormLabel>
            <Input
              autoComplete="off"
              {...nameRegister}
              ref={nameInputRef}
              focusBorderColor={isInvalid ? 'red.500' : undefined}
              placeholder="Enter variant name"
            />
            <FormErrorMessage>{errors['name']?.message}</FormErrorMessage>
          </FormControl>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Close
        </Button>
        <Button colorScheme="teal" variant="solid" onClick={onSubmit}>
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default Content
