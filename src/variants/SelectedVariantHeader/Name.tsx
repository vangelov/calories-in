import { Input } from '@chakra-ui/react'
import { forwardRef, ForwardedRef } from 'react'

type Props = {
  forwardedRef?: ForwardedRef<HTMLInputElement>
  name: string
  onNameChange: (name: string) => void
}

function Name({ forwardedRef, name, onNameChange }: Props) {
  return (
    <Input
      ref={forwardedRef}
      placeholder="Meal plan name"
      size="md"
      fontSize="lg"
      fontWeight="semibold"
      autoComplete="off"
      bg="white"
      borderBottomRightRadius={0}
      borderTopRightRadius={0}
      color="teal"
      mr="-1px"
      zIndex={1}
      position="relative"
      onChange={event => onNameChange(event.target.value)}
      value={name}
    />
  )
}

export default forwardRef<HTMLInputElement, Props>((props, ref) => (
  <Name forwardedRef={ref} {...props} />
))
