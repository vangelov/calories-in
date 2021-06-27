import {
  FormControl,
  Flex,
  FormLabel,
  Text,
  VStack,
  Divider,
  FormErrorMessage,
  FormControlProps,
} from '@chakra-ui/react'
import { RefObject } from 'react'
import { useFormContext } from 'react-hook-form'
import useGetInputElement, { InputType } from './useGetInputElement'

type Props = {
  name: string
  label: string
  inputType: InputType
  nutritionValueUnit?: string
  isIdented?: boolean
  textInputRef?: RefObject<HTMLInputElement>
} & FormControlProps

function FormField(props: Props) {
  const {
    name,
    label,
    inputType,
    isIdented = false,
    nutritionValueUnit = 'g',
    textInputRef,
    ...rest
  } = props
  const { formState } = useFormContext()
  const { errors } = formState
  const isInvalid = errors[name] !== undefined
  const inputElement = useGetInputElement({
    isInvalid,
    name,
    inputType,
    textInputRef,
  })

  return (
    <FormControl
      isInvalid={isInvalid}
      id={name}
      pl={isIdented ? 10 : 0}
      {...rest}
    >
      <VStack spacing={2} alignItems="stretch">
        {isIdented ? <Divider /> : null}
        <Flex justifyContent="space-between" alignItems="center">
          <FormLabel fontWeight={isIdented ? 'normal' : 'medium'} mt={2}>
            {label}
          </FormLabel>

          <Flex width="60%" justifyContent="flex-end">
            {inputElement}

            {inputType === 'nutritionValue' && (
              <Flex
                width={9}
                flexShrink={0}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Text fontSize="lg" textColor="gray.500" ml={1}>
                  {nutritionValueUnit}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
      </VStack>
    </FormControl>
  )
}

export default FormField
