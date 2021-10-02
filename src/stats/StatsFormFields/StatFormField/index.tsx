import {
  FormControl,
  Flex,
  FormLabel,
  Text,
  VStack,
  Divider,
  FormErrorMessage,
  FormControlProps,
  Box,
  Fade,
} from '@chakra-ui/react'
import { useFormError } from 'general'
import { ReactNode, RefObject } from 'react'
import useGetInputElement, { InputType } from './useGetInputElement'

type Props = {
  name: string
  label: string
  labelDetail?: string
  inputType: InputType
  nutritionValueUnit?: string
  isIdented?: boolean
  textInputRef?: RefObject<HTMLInputElement>
  isReadOnly?: boolean
  isEmphasized?: Boolean
  isCaption?: boolean
  children?: ReactNode
  isValueBold?: boolean
} & FormControlProps

function StatFormField(props: Props) {
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
    children,
    labelDetail,
    ...rest
  } = props
  const { errorMessage, isInvalid } = useFormError(name)

  const inputElement = useGetInputElement({
    isInvalid,
    name,
    inputType,
    textInputRef,
    isReadOnly,
    nutritionValueUnit,
    isBold: isValueBold,
  })

  const labelDetailElement = labelDetail ? (
    <Text
      as={isReadOnly ? 'span' : undefined}
      fontSize="sm"
      fontWeight="thin"
      ml={isReadOnly ? 1 : 0}
    >
      {labelDetail}
    </Text>
  ) : null

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
            isReadOnly && !(isCaption || isEmphasized)
              ? undefined
              : 'space-between'
          }
          alignItems="center"
        >
          <Box>
            <FormLabel
              fontWeight={
                isIdented ? 'normal' : isEmphasized ? 'semibold' : 'medium'
              }
              flexShrink={0}
              fontSize={isCaption ? 'lg' : 'md'}
              m={0}
            >
              {label}
              {isReadOnly && labelDetailElement}
            </FormLabel>
            {!isReadOnly && labelDetailElement}
          </Box>

          <Flex ml={2} justifyContent="flex-end">
            {inputElement}

            {!isReadOnly && inputType === 'nutritionValue' && (
              <Flex
                width={9}
                flexShrink={0}
                justifyContent="flex-start"
                alignItems="center"
                ml={1}
              >
                <Text fontSize="lg" textColor="gray.500">
                  {nutritionValueUnit}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Fade in={Boolean(errorMessage)}>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </Fade>
      </VStack>

      {children}
    </FormControl>
  )
}

export default StatFormField
