import { InputProps, Input, Flex } from '@chakra-ui/react'
import { MouseEvent, ReactNode } from 'react'

type Props = {
  children?: ReactNode
} & InputProps

const MAX_AMOUNT_EXCLUDING = 10000

function AmountInput({ size, name, children, ...rest }: Props) {
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
    <Flex alignItems="center">
      <Input
        fontSize="md"
        autoComplete="off"
        borderColor="gray.200"
        textColor="gray.500"
        textAlign="right"
        bg="white"
        maxWidth="64px"
        size={size}
        type="number"
        pattern="\d*"
        borderTopLeftRadius={6}
        borderBottomLeftRadius={6}
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
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

      {children}
    </Flex>
  )
}

export default AmountInput
