import { Input } from '@chakra-ui/react'
import { FoodAmountInput } from 'components/foods'
import { cloneElement, ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { FoodCategoriesSelect } from 'components/foods'

type InputType = 'text' | 'nutritionValue' | 'foodCategory'

type Params = {
  name: string
  inputType: InputType
  isInvalid: boolean
}

function useGetInputElement({ inputType, name, isInvalid }: Params) {
  const { register } = useFormContext()
  let result: ReactElement | null = null

  if (inputType === 'text') {
    result = (
      <Input
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

export type { InputType }

export default useGetInputElement
