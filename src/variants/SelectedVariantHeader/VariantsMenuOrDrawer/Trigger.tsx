import { IconButton, ButtonProps } from '@chakra-ui/react'
import { ChevronDown } from 'react-feather'
import { ForwardedRef, forwardRef } from 'react'
import { Tooltip } from 'general'

type Props = {
  forwardedRef?: ForwardedRef<HTMLButtonElement>
} & ButtonProps

function Trigger({ forwardedRef, ...rest }: Props) {
  return (
    <Tooltip label="All variants">
      <IconButton
        borderBottomLeftRadius={0}
        borderTopLeftRadius={0}
        variant="outline"
        aria-label="test"
        icon={<ChevronDown />}
        ref={forwardedRef}
        color="teal"
        {...rest}
      />
    </Tooltip>
  )
}
export default forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <Trigger {...props} forwardedRef={ref} />
))
