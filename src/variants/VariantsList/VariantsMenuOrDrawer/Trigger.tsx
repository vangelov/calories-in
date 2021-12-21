import { IconButton } from '@chakra-ui/react'
import { ChevronDown } from 'react-feather'
import { ForwardedRef, forwardRef } from 'react'
import { useScreenSize, Tooltip, ScreenSize } from 'general'

type Props = {
  forwardedRef?: ForwardedRef<HTMLButtonElement>
  onClick?: () => void
}

function Trigger({ forwardedRef, onClick, ...rest }: Props) {
  const screenSize = useScreenSize()
  const isPhone = screenSize <= ScreenSize.Small

  return (
    <Tooltip label="All days">
      <IconButton
        borderRadius="full"
        bg="white"
        size="md"
        aria-label="Add variant"
        icon={<ChevronDown size={20} pointerEvents="none" />}
        variant="outline"
        mr={isPhone ? 0 : 2}
        ml={isPhone ? 2 : 0}
        flexShrink={0}
        ref={forwardedRef}
        onClick={onClick}
        {...rest}
      />
    </Tooltip>
  )
}
export default forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <Trigger {...props} forwardedRef={ref} />
))
