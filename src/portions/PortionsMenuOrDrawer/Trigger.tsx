import { ForwardedRef, forwardRef } from 'react'
import { Button } from '@chakra-ui/react'

type Props = {
  forwardedRef?: ForwardedRef<HTMLButtonElement>
  onClick?: () => void
}

function Trigger({ forwardedRef, ...rest }: Props) {
  return (
    <Button
      size="sm"
      ml="-1px"
      borderTopRightRadius={6}
      borderBottomRightRadius={6}
      borderTopLeftRadius={0}
      borderBottomLeftRadius={0}
      variant="outline"
      fontSize="sm"
      textColor="gray.500"
      ref={forwardedRef}
      {...rest}
    >
      g
    </Button>
  )
}
export default forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <Trigger {...props} forwardedRef={ref} />
))
