import { Flex, FlexProps } from '@chakra-ui/react'
import { ForwardedRef, ReactElement, forwardRef } from 'react'
import { MenuItem, ControlledMenu } from 'general'
import { useState } from 'react'
import { getMenuItems } from './MenuOrDrawer'
import { isDesktop } from 'react-device-detect'

type Props = {
  menuItems?: ReactElement<typeof MenuItem>[]
  menuOrDrawerItems?: ReactElement[]
  forwardedRef?: ForwardedRef<HTMLDivElement>
} & FlexProps

function ContextMenuFlex({
  menuItems,
  menuOrDrawerItems = [],
  children,
  forwardedRef,
  ...rest
}: Props) {
  const [isOpen, setOpen] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })

  return (
    <Flex
      {...rest}
      ref={forwardedRef}
      onContextMenu={event => {
        const { target, clientX, clientY } = event

        if (
          !isDesktop ||
          (target as HTMLElement).tagName?.toLowerCase() === 'input'
        ) {
          return
        }

        event.preventDefault()
        setAnchorPoint({ x: clientX, y: clientY })
        setOpen(true)
      }}
    >
      {isDesktop && (
        <ControlledMenu
          anchorPoint={anchorPoint}
          isOpen={isOpen}
          viewScroll="close"
          portal={true}
          onClose={() => setOpen(false)}
        >
          {getMenuItems(menuOrDrawerItems)}
        </ControlledMenu>
      )}
      {children}
    </Flex>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <ContextMenuFlex {...props} forwardedRef={ref} />
))
