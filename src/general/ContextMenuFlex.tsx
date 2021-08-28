import { Flex, FlexProps } from '@chakra-ui/react'
import { ForwardedRef, ReactElement, forwardRef } from 'react'
import { MenuItem, ControlledMenu } from 'general'
import { useState } from 'react'

type Props = {
  menuItems: ReactElement<typeof MenuItem>[]
  forwardedRef?: ForwardedRef<HTMLDivElement>
} & FlexProps

function ContextMenuFlex({
  menuItems,
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

        if ((target as HTMLElement).tagName?.toLowerCase() === 'input') {
          return
        }

        event.preventDefault()
        setAnchorPoint({ x: clientX, y: clientY })
        setOpen(true)
      }}
    >
      <ControlledMenu
        anchorPoint={anchorPoint}
        isOpen={isOpen}
        viewScroll="close"
        portal={true}
        onClose={() => setOpen(false)}
      >
        {menuItems}
      </ControlledMenu>
      {children}
    </Flex>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <ContextMenuFlex {...props} forwardedRef={ref} />
))
