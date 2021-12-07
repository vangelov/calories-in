import { InputProps, Input, Flex } from '@chakra-ui/react'
import { MouseEvent, ReactNode, WheelEvent } from 'react'
import amountAsNumber from 'stats/amountAsNumber'

type Props = {
  children?: ReactNode
  acceptsFractions?: boolean
} & InputProps

const MAX_AMOUNT_EXCLUDING = 10000

function AmountInput({
  name,
  children,
  acceptsFractions = false,
  ...rest
}: Props) {
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

  function onWheel(event: WheelEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement
    target.blur()
  }

  const numProps = acceptsFractions
    ? {}
    : {
        type: 'number',
        pattern: '\\d*',
        onMouseDown,
        onWheel,
      }

  return (
    <Flex alignItems="center">
      <Input
        fontSize="md"
        autoComplete="off"
        borderColor="gray.200"
        textColor="gray.800"
        textAlign="right"
        bg="white"
        maxWidth="68px"
        {...numProps}
        {...rest}
        onChange={event => {
          const { value } = event.target
          const valueAsNumber = amountAsNumber(value)

          if (valueAsNumber >= 0 && valueAsNumber < MAX_AMOUNT_EXCLUDING) {
            rest.onChange && rest.onChange(event)
          }
        }}
      />

      {children}
    </Flex>
  )
}

export default AmountInput
