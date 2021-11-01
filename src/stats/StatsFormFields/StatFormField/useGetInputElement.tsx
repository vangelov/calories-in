import { Input, useMergeRefs } from '@chakra-ui/react'
import { cloneElement, ReactElement, RefObject } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { FoodCategoriesSelect } from 'foods-categories'
import { InputType } from './types'
import ReadOnlyInput from './ReadOnlyInput'
import { AmountInput } from 'stats'

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
        width={{ base: '150px', md: '200px' }}
      />
    )
  } else if (inputType === 'foodCategory') {
    result = (
      <FoodCategoriesSelect
        {...register(name, {
          valueAsNumber: true,
        })}
        width={{ base: '150px', md: '200px' }}
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
          <AmountInput value={field.value} onChange={field.onChange} />
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
