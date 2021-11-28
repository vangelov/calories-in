import { IconButton, ButtonProps } from '@chakra-ui/react'
import { MoreHorizontal } from 'react-feather'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  forwardedRef?: ForwardedRef<HTMLButtonElement>
} & ButtonProps

function Trigger({ forwardedRef, ...rest }: Props) {
  return (
    <IconButton
      aria-label="Actions"
      icon={<MoreHorizontal size={20} pointerEvents="none" />}
      variant="ghost"
      size="sm"
      ref={forwardedRef}
      {...rest}
    />
  )
}
export default forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <Trigger {...props} forwardedRef={ref} />
))
