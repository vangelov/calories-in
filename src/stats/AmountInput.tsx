import { InputProps, Input, Text, HStack } from '@chakra-ui/react'
import { MouseEvent } from 'react'

type Props = {
  unit?: string
} & InputProps

const MAX_AMOUNT_EXCLUDING = 10000

function AmountInput({ unit = 'g', size, name, ...rest }: Props) {
  function onMouseDown(event: MouseEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement

    if (document.activeElement !== input) {
      event.preventDefault()
      const length = input.value.length
      input.focus()

      input.type = 'text'
      input.setSelectionRange(length, length)
      input.type = 'number'
    }
  }

  return (
    <HStack spacing={1} alignItems="center">
      <Input
        fontSize="md"
        autoComplete="off"
        borderColor="gray.200"
        textColor="gray.500"
        textAlign="right"
        bg="white"
        maxWidth="74px"
        size={size}
        type="number"
        pattern="\d*"
        borderRadius={6}
        {...rest}
        onChange={event => {
          const { value } = event.target
          const valueAsNumber = Number(value)

          if (valueAsNumber >= 0 && valueAsNumber < MAX_AMOUNT_EXCLUDING) {
            rest.onChange && rest.onChange(event)
          }
        }}
        onMouseDown={onMouseDown}
      />

      {unit && (
        <Text fontSize="sm" textColor="gray.500">
          {unit}
        </Text>
      )}
    </HStack>
  )
}

export default AmountInput
