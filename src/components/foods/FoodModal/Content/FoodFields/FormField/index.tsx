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
  isReadOnly?: boolean
  isEmphasized?: Boolean
  isCaption?: boolean

  isValueBold?: boolean
} & FormControlProps

function FormField(props: Props) {
  const {
    name,
    label,
    inputType,
    isIdented = false,
    nutritionValueUnit = 'g',
    textInputRef,
    isReadOnly = false,
    isEmphasized = false,
    isValueBold = false,
    isCaption = false,
    isRequired,

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
    isReadOnly,
    nutritionValueUnit,
    isBold: isValueBold,
  })

  return (
    <FormControl
      isInvalid={isInvalid}
      id={name}
      pl={isIdented ? 10 : 0}
      isRequired={!isReadOnly && isRequired}
      {...rest}
    >
      <VStack spacing={2} alignItems="stretch">
        {isIdented ? <Divider /> : null}
        <Flex
          justifyContent={
            isReadOnly && !isCaption ? undefined : 'space-between'
          }
          alignItems="center"
        >
          <FormLabel
            fontWeight={
              isIdented ? 'normal' : isEmphasized ? 'semibold' : 'medium'
            }
            flexShrink={0}
            fontSize={isCaption ? 'lg' : 'md'}
            mt={2}
          >
            {label}
          </FormLabel>

          <Flex
            width={isReadOnly && !isCaption ? undefined : '60%'}
            justifyContent="flex-end"
          >
            {inputElement}

            {!isReadOnly && inputType === 'nutritionValue' && (
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
