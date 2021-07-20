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
import { RefObject, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMergeRefs } from '@chakra-ui/react'
import {
  getInsertVariantFormAnimationKey,
  VariantForm,
  VariantNameFormSubmitAction,
} from 'core/diets'
import useSubmitVariantForm from 'core/diets/variantForm/useSubmitVariantForm'
import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'

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
    onComplete: (variantForm: VariantForm) => {
      onClose()
    },
  })

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current.setSelectionRange(0, initialRef.current.value.length)
    }
  }, [initialRef])

  console.log('e', errors, formState.isSubmitting)

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
