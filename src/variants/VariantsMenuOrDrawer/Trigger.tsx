import { IconButton } from '@chakra-ui/react'
import { Menu } from 'react-feather'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  forwardedRef?: ForwardedRef<HTMLButtonElement>
  onClick?: () => void
}

function Trigger({ forwardedRef, onClick, ...rest }: Props) {
  return (
    <IconButton
      borderRadius="full"
      size="sm"
      aria-label="Add variant"
      icon={<Menu size={20} pointerEvents="none" />}
      variant="outline"
      mr={3}
      flexShrink={0}
      ref={forwardedRef}
      onClick={onClick}
      {...rest}
    />
  )
}
export default forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <Trigger {...props} forwardedRef={ref} />
))
