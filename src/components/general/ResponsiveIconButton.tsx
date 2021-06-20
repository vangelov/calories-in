import { IconButtonProps, IconButton, Tooltip } from '@chakra-ui/react'
import { useScreenSize } from 'core/ScreenSizeProvider'
import { ForwardedRef, forwardRef } from 'react'
import { isMobile } from 'react-device-detect'

type Props = {
  withoutTooltip?: boolean
  forwardedRef?: ForwardedRef<HTMLButtonElement>
} & IconButtonProps

function ResponsiveIconButton({
  forwardedRef,
  withoutTooltip = false,
  ...rest
}: Props) {
  const screenSize = useScreenSize()
  const size = screenSize >= 2 ? 'sm' : 'md'
  const buttonElement = <IconButton ref={forwardedRef} size={size} {...rest} />

  if (screenSize < 2 || isMobile || withoutTooltip) {
    return buttonElement
  }

  return (
    <Tooltip isLaz hasArrow label={rest['aria-label']}>
      {buttonElement}
    </Tooltip>
  )
}

export default forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <ResponsiveIconButton forwardedRef={ref} {...props} />
))
