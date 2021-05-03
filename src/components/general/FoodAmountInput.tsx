import { InputProps, Input, Text, HStack } from '@chakra-ui/react'
import { ForwardedRef, forwardRef, MouseEvent } from 'react'

type Props = { forwardedRef?: ForwardedRef<HTMLInputElement> } & InputProps

function FoodAmountInput({ forwardedRef, ...rest }: Props) {
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
      <Input
        css={{ 'z-index': '0 !important' }}
        width="79px"
        height={12}
        fontSize="md"
        autoComplete="off"
        borderColor="gray.200"
        textColor="gray.500"
        textAlign="right"
        bg="white"
        onMouseDown={onMouseDown}
        {...rest}
        ref={forwardedRef}
      />
      <Text size="lg" textColor="gray.500">
        g
      </Text>
    </HStack>
  )
}

export default forwardRef<HTMLInputElement, Props>((props, ref) => (
  <FoodAmountInput forwardedRef={ref} {...props} />
))
