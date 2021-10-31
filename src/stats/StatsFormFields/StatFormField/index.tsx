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
  DividerProps,
  FormLabelProps,
} from '@chakra-ui/react'
import { useFormError } from 'form'
import { ReactNode, RefObject } from 'react'
import useGetInputElement, { InputType } from './useGetInputElement'

type Props = {
  name: string
  label?: string
  labelElement?: ReactNode
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
  dividerProps?: DividerProps
  hasDivider?: boolean
  dailyValuePercent?: number
  formLabelProps?: FormLabelProps
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
    dividerProps = {},
    hasDivider = true,
    dailyValuePercent,
    labelElement,
    formLabelProps,
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
      ml={1}
    >
      {labelDetail}
    </Text>
  ) : null

  const isValueNextToLabel = isReadOnly && !(isCaption || isEmphasized)

  return (
    <FormControl
      isInvalid={isInvalid}
      id={name}
      pl={isIdented ? 10 : 0}
      isRequired={!isReadOnly && isRequired}
      {...rest}
    >
      <VStack spacing={2} alignItems="stretch">
        {hasDivider && <Divider {...dividerProps} />}
        <Flex justifyContent={'space-between'} alignItems="center">
          <Flex>
            <FormLabel
              fontWeight={
                isIdented ? 'normal' : isEmphasized ? 'semibold' : 'medium'
              }
              flexShrink={0}
              fontSize={isCaption ? 'lg' : 'md'}
              m={0}
              {...formLabelProps}
            >
              {label || labelElement}
              {isReadOnly && labelDetailElement}
            </FormLabel>
            {!isReadOnly && labelDetailElement}
            {isValueNextToLabel && <Box ml={2}>{inputElement}</Box>}
          </Flex>

          <Flex ml={2} justifyContent="flex-end">
            {!isValueNextToLabel && inputElement}

            {dailyValuePercent !== undefined && isValueNextToLabel && (
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
                <Text textColor="gray.500">{nutritionValueUnit}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </VStack>

      <Collapse animateOpacity={true} in={Boolean(errorMessage)}>
        <Box minHeight="21px">
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </Box>
      </Collapse>

      {children}
    </FormControl>
  )
}

export type { Props as StatFormFieldProps }

export default StatFormField
