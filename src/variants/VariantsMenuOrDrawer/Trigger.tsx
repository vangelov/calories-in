import { IconButton } from '@chakra-ui/react'
import { Menu } from 'react-feather'
import { ForwardedRef, forwardRef } from 'react'
import { useScreenSize } from 'general'

type Props = {
  forwardedRef?: ForwardedRef<HTMLButtonElement>
  onClick?: () => void
}

function Trigger({ forwardedRef, onClick, ...rest }: Props) {
  const screenSize = useScreenSize()
  const isPhone = screenSize <= 1

  return (
    <IconButton
      borderRadius="full"
      size="sm"
      aria-label="Add variant"
      icon={<Menu size={20} pointerEvents="none" />}
      variant="outline"
      mr={isPhone ? 0 : 3}
      ml={isPhone ? 3 : 0}
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
