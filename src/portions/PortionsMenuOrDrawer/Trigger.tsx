import { ForwardedRef, forwardRef } from 'react'
import { Button } from '@chakra-ui/react'
import { usePortions } from 'portions'

type Props = {
  selectedPortionId: string
  forwardedRef?: ForwardedRef<HTMLButtonElement>
  onClick?: () => void
}

function Trigger({ forwardedRef, selectedPortionId, ...rest }: Props) {
  const { portionsById } = usePortions()
  const portion = portionsById[selectedPortionId]

  return (
    <Button
      size="sm"
      borderTopRightRadius={6}
      borderBottomRightRadius={6}
      borderTopLeftRadius={0}
      borderBottomLeftRadius={0}
      variant="outline"
      fontSize="sm"
      textColor="gray.600"
      ref={forwardedRef}
      {...rest}
    >
      {portion.unit}
    </Button>
  )
}
export default forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <Trigger {...props} forwardedRef={ref} />
))
