import { Input, useMergeRefs } from '@chakra-ui/react'
import { cloneElement, ReactElement, RefObject } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { FoodAmountInput } from 'foods'
import { FoodCategoriesSelect } from 'foods-categories'
import { InputType } from './types'
import ReadOnlyInput from './ReadOnlyInput'

type Params = {
  name: string
  inputType: InputType
  isInvalid: boolean
  textInputRef?: RefObject<HTMLInputElement>
  nutritionValueUnit: string
  isReadOnly: boolean
  isBold?: boolean
}

function useGetInputElement({
  inputType,
  name,
  isInvalid,
  nutritionValueUnit,
  isReadOnly,
  textInputRef,
  isBold = false,
}: Params) {
  const { register } = useFormContext()
  let result: ReactElement | null = null
  const textInputRegister = register(name)
  const finalTextInputRef = useMergeRefs(textInputRegister.ref, textInputRef)

  if (isReadOnly) {
    result = (
      <ReadOnlyInput
        name={name}
        inputType={inputType}
        nutritionValueUnit={nutritionValueUnit}
        isBold={isBold}
      />
    )
  } else if (inputType === 'text') {
    result = (
      <Input
        autoComplete="off"
        {...textInputRegister}
        ref={finalTextInputRef}
        fontWeight={isBold ? 'semibold' : 'normal'}
      />
    )
  } else if (inputType === 'foodCategory') {
    result = (
      <FoodCategoriesSelect
        {...register(name, {
          valueAsNumber: true,
        })}
      >
        <option disabled value={undefined}>
          Select category
        </option>
      </FoodCategoriesSelect>
    )
  } else if (inputType === 'nutritionValue') {
    result = (
      <Controller
        name={name}
        render={({ field }) => (
          <FoodAmountInput
            value={field.value}
            onChange={field.onChange}
            unit=""
          />
        )}
      />
    )
  }

  if (!result) {
    throw new Error()
  }

  if (isInvalid) {
    return cloneElement(result, {
      focusBorderColor: 'red.500',
    })
  }

  return result
}

export type { InputType }

export default useGetInputElement
