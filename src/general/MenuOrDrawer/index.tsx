import { useScreenSize, ScreenSize } from 'general'
import Drawer from './Drawer'
import Trigger from './Trigger'
import { useDisclosure, IconButtonProps } from '@chakra-ui/react'
import Menu from './Menu'
import { ReactElement } from 'react'

type Props = {
  children: ReactElement | ReactElement[]
  title: string
} & IconButtonProps

function MenuOrDrawer({ children, title, ...rest }: Props) {
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()

  if (screenSize < ScreenSize.Medium) {
    return (
      <>
        <Trigger onClick={modalDisclosure.onOpen} {...rest} />
        <Drawer
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
          title={title}
        >
          {children}
        </Drawer>
      </>
    )
  }

  return (
    <Menu title={title} {...rest}>
      {children}
    </Menu>
  )
}

export { default as MenuOrDrawerItem } from './MenuOrDrawerItem'
export { default as MenuOrDrawerSeparator } from './MenuOrDrawerSeparator'
export * from './Menu'
export * from './Drawer'

export default MenuOrDrawer
