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
import { useForm } from 'react-hook-form'
import { useMergeRefs } from '@chakra-ui/react'

type Props = {
  onClose: () => void
  initialRef: RefObject<HTMLInputElement>
  onSave: (name: string) => void
  existingVariantsNames: string[]
}

type VariantNameForm = {
  name: string
}

function BodyAndFooter({
  onClose,
  initialRef,
  existingVariantsNames,
  onSave,
}: Props) {
  const formMethods = useForm<VariantNameForm>({
    defaultValues: { name: '' },
    mode: 'onChange',
  })
  const { register, handleSubmit, formState } = formMethods
  const nameRegister = register('name', {
    required: 'Please enter a name',
    validate: {
      isUnique: (value: string) => {
        if (existingVariantsNames.includes(value)) {
          return 'This name has already been used'
        }

        return true
      },
    },
  })
  const nameInputRef = useMergeRefs(nameRegister.ref, initialRef)
  const { errors } = formState

  const onSubmit = handleSubmit((form: VariantNameForm) => {
    console.log('submit', form)

    onSave(form.name)
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
