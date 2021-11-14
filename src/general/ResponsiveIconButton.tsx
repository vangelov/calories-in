import { IconButtonProps, IconButton } from '@chakra-ui/react'
import { useScreenSize, ScreenSize } from 'general'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  forwardedRef?: ForwardedRef<HTMLButtonElement>
  tooltip?: string
} & IconButtonProps

function ResponsiveIconButton({
  forwardedRef,

  ...rest
}: Props) {
  const screenSize = useScreenSize()
  const size = screenSize >= ScreenSize.Medium ? 'sm' : 'sm'

  return <IconButton ref={forwardedRef} size={size} {...rest} />
}

export default forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <ResponsiveIconButton forwardedRef={ref} {...props} />
))
