import { InputProps, Input, Text, HStack } from '@chakra-ui/react'
import { ForwardedRef, forwardRef, MouseEvent } from 'react'
import { Controller } from 'react-hook-form'

type Props = {
  name: string
  forwardedRef?: ForwardedRef<HTMLInputElement>
} & InputProps

const MAX_AMOUNT_EXCLUDING = 10000

function FoodAmountInput({ name, defaultValue, onChange }: Props) {
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
            onChange={event => {
              const value = event.target.value

              if (Number(value) < MAX_AMOUNT_EXCLUDING) {
                field.onChange(value)
                onChange && onChange(event)
              }
            }}
            value={field.value}
            onMouseDown={onMouseDown}
          />
        )}
      />

      <Text fontSize="lg" textColor="gray.500">
        g
      </Text>
    </HStack>
  )
}

export default forwardRef<HTMLInputElement, Props>((props, ref) => (
  <FoodAmountInput forwardedRef={ref} {...props} />
))
