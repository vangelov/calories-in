import { IconButtonProps, IconButton, Tooltip } from '@chakra-ui/react'
import { useScreenSize } from './ScreenSizeProvider'
import { ForwardedRef, forwardRef } from 'react'
import { isMobile } from 'react-device-detect'

type Props = {
  isResponsive?: boolean
  forwardedRef?: ForwardedRef<HTMLButtonElement>
  tooltip?: string
} & IconButtonProps

function ResponsiveIconButton({
  forwardedRef,
  isResponsive = true,
  ...rest
}: Props) {
  const screenSize = useScreenSize()
  const size = isResponsive && screenSize >= 2 ? 'sm' : 'md'
  const buttonElement = <IconButton ref={forwardedRef} size={size} {...rest} />

  if (isMobile) {
    return buttonElement
  }

  return (
    <Tooltip
      hasArrow
      label={rest['aria-label']}
      openDelay={1000}
      closeOnMouseDown={true}
    >
      {buttonElement}
    </Tooltip>
  )
}

export default forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <ResponsiveIconButton forwardedRef={ref} {...props} />
))
