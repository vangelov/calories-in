import { Text } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import foodCategories from 'core/foods/categories.json'
import { InputType } from './types'

type Props = {
  name: string
  inputType: InputType
  nutritionValueUnit: string
}

function formatNutritionValue(value: string) {
  const number = Number(value)

  if (Number.isInteger(number)) {
    return value
  }

  return number.toFixed(2)
}

function ReadOnlyInput({ name, inputType, nutritionValueUnit }: Props) {
  return (
    <Controller
      name={name}
      render={({ field }) => {
        let { value } = field

        if (inputType === 'foodCategory') {
          const foodCategory = foodCategories.find(({ id }) => id === value)
          if (foodCategory) {
            value = foodCategory.name
          }
        }

        return (
          <Text textColor="gray.500" fontSize="lg">
            {inputType === 'nutritionValue'
              ? `${formatNutritionValue(value)}${nutritionValueUnit}`
              : value}
          </Text>
        )
      }}
    />
  )
}

export default ReadOnlyInput
