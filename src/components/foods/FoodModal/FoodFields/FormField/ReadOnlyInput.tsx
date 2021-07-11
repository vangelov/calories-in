import { Text } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import foodCategories from 'core/foods/categories.json'
import { InputType } from './types'

type Props = {
  name: string
  inputType: InputType
  nutritionValueUnit: string
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
            {value}
            {inputType === 'nutritionValue' ? nutritionValueUnit : ''}
          </Text>
        )
      }}
    />
  )
}

export default ReadOnlyInput
