import { Button, ButtonProps } from '@chakra-ui/react'
import { useScreenSize } from 'core/ScreenSizeProvider'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  forwardedRef?: ForwardedRef<HTMLButtonElement>
} & ButtonProps

function ResponsiveButton({ forwardedRef, ...rest }: Props) {
  const screenSize = useScreenSize()
  const size = screenSize >= 2 ? 'sm' : 'md'

  return <Button ref={forwardedRef} size={size} {...rest} />
}

export default forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <ResponsiveButton forwardedRef={ref} {...props} />
))
