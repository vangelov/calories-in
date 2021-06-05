import { InputProps, Input, Text, HStack } from '@chakra-ui/react'
import { MouseEvent } from 'react'
import { Controller } from 'react-hook-form'

type Props = {
  name: string
  unit?: string
} & InputProps

const MAX_AMOUNT_EXCLUDING = 10000

function FoodAmountInput({
  name,
  defaultValue,
  onChange,
  unit = 'g',
  ...rest
}: Props) {
  function onMouseDown(event: MouseEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement

    if (document.activeElement !== input) {
      event.preventDefault()
      const length = input.value.length
      input.focus()
      input.setSelectionRange(length, length)
    }
  }

  return (
    <HStack spacing={1} alignItems="center">
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            fontSize="md"
            autoComplete="off"
            borderColor="gray.200"
            textColor="gray.500"
            textAlign="right"
            bg="white"
            maxWidth={20}
            size="md"
            {...rest}
            onChange={event => {
              const value = event.target.value
              const valueAsNumber = Number(value)

              if (valueAsNumber < MAX_AMOUNT_EXCLUDING) {
                field.onChange(valueAsNumber)
                onChange && onChange(event)
              }
            }}
            value={field.value}
            onMouseDown={onMouseDown}
          />
        )}
      />

      {unit && (
        <Text fontSize="lg" textColor="gray.500">
          {unit}
        </Text>
      )}
    </HStack>
  )
}

export default FoodAmountInput
