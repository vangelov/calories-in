import {
  FormControl,
  Flex,
  FormLabel,
  Input,
  Text,
  VStack,
  Divider,
  FormErrorMessage,
  FormControlProps,
} from '@chakra-ui/react'
import { FoodAmountInput } from 'components/foods'
import { cloneElement, ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { FoodCategoriesSelect } from 'components/foods'

type InputType = 'text' | 'nutritionValue' | 'foodCategory'

type Props = {
  name: string
  label: string
  inputType: InputType
  nutritionValueUnit?: string
  isIdented?: boolean
} & FormControlProps

function useGetInputElement({ inputType, name }: Props, isInvalid: boolean) {
  const { register } = useFormContext()
  let result: ReactElement | null = null

  if (inputType === 'text') {
    result = (
      <Input
        autoFocus={true}
        autoComplete="off"
        {...register(name, { required: 'Please enter a name' })}
      />
    )
  }

  if (inputType === 'foodCategory') {
    result = (
      <FoodCategoriesSelect
        {...register(name, {
          valueAsNumber: true,
          required: 'Please select a category',
        })}
      >
        <option disabled value={undefined}>
          Select category
        </option>
      </FoodCategoriesSelect>
    )
  }

  if (inputType === 'nutritionValue') {
    result = <FoodAmountInput name={name} unit="" />
  }

  if (!result) {
    throw new Error()
  }

  if (isInvalid) {
    return cloneElement(result, { focusBorderColor: 'red.500' })
  }

  return result
}

function FormField(props: Props) {
  const {
    name,
    label,
    inputType,
    isIdented = false,
    nutritionValueUnit = 'g',
    ...rest
  } = props
  const { formState } = useFormContext()
  const { errors } = formState
  const isInvalid = errors[name] !== undefined
  const inputElement = useGetInputElement(props, isInvalid)

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
