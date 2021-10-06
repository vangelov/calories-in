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
  Collapse,
} from '@chakra-ui/react'
import { useFormError } from 'form'
import { ReactNode, RefObject } from 'react'
import useGetDailyValuePercent from './useGetDailyValuePercent'
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
  const dailyValuePercent = useGetDailyValuePercent(name as any)

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
      ml={1}
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
        <Flex justifyContent={'space-between'} alignItems="center">
          <Flex>
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
            {isReadOnly && !(isCaption || isEmphasized) && (
              <Box ml={2}>{inputElement}</Box>
            )}
          </Flex>

          <Flex ml={2} justifyContent="flex-end">
            {!(isReadOnly && !(isCaption || isEmphasized)) && inputElement}

            {dailyValuePercent !== undefined &&
              dailyValuePercent > 0 &&
              isReadOnly &&
              !(isCaption || isEmphasized) && (
                <Text fontWeight="medium">{`${dailyValuePercent}%`}</Text>
              )}

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
        <Collapse animateOpacity={true} in={Boolean(errorMessage)}>
          <Box minHeight="21px">
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </Box>
        </Collapse>
      </VStack>

      {children}
    </FormControl>
  )
}

export default StatFormField
