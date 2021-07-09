import {
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { RefObject } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMergeRefs } from '@chakra-ui/react'
import {
  useVariantsFormsStoreMethods,
  VariantField,
  VariantNameForm,
} from 'core/diets'
import { Action } from './types'

type Props = {
  onClose: () => void
  initialRef: RefObject<HTMLInputElement>
  variantsFields: VariantField[]
  selectedVariantFieldIndex?: number
  action: Action
}

function BodyAndFooter({
  onClose,
  initialRef,
  variantsFields,
  action,
  selectedVariantFieldIndex,
}: Props) {
  const variantsFormsStoreMethods = useVariantsFormsStoreMethods()

  const { register, handleSubmit, formState } = useFormContext()
  const nameRegister = register('name')
  const nameInputRef = useMergeRefs(nameRegister.ref, initialRef)
  const { errors } = formState

  const onSubmit = handleSubmit((form: VariantNameForm) => {
    console.log('submit', form)
    onClose()

    if (action === 'append') {
      variantsFormsStoreMethods.appendVariantForm(form.name)
    } else if (action === 'copy') {
      variantsFormsStoreMethods.cloneVariantForm(
        form.name,
        selectedVariantFieldIndex as number
      )
    } else if (action === 'rename') {
      variantsFormsStoreMethods.renameVariantForm(
        form.name,
        selectedVariantFieldIndex as number
      )
    }
  })

  const isInvalid = errors['name'] !== undefined

  return (
    <>
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
    </>
  )
}

export default BodyAndFooter
