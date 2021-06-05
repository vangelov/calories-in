import {
  FormControl,
  Flex,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react'
import { FoodAmountInput } from 'components/general'
import { FOODS_CATEGORIES } from 'core/foodsCategories'

type InputType = 'text' | 'nutritionValue' | 'foodCategory'

type Props = {
  name: string
  label: string
  inputType: InputType
  nutritionValueUnit?: string
  isIdented?: boolean
}

function getInputElement({ inputType, nutritionValueUnit, name }: Props) {
  if (inputType === 'text') {
    return <Input autoComplete="none" name={name} />
  }

  if (inputType === 'foodCategory') {
    return (
      <Select
        onChange={() => {}}
        focusBorderColor="custom.500"
        size="md"
        name={name}
      >
        <option disabled selected value={undefined}>
          Select category
        </option>
        {FOODS_CATEGORIES.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    )
  }

  if (inputType === 'nutritionValue') {
    return <FoodAmountInput name={name} unit="" />
  }

  throw new Error()
}

function FormField(props: Props) {
  const {
    name,
    label,
    inputType,
    isIdented = false,
    nutritionValueUnit = 'g',
  } = props
  const inputElement = getInputElement(props)

  return (
    <FormControl id={name} pl={isIdented ? 10 : 0}>
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
      </VStack>
    </FormControl>
  )
}

export default FormField
