import { ButtonProps } from '@chakra-ui/react'
import { Menu as MenuBase, MenuHeader } from 'general'
import Trigger from '../Trigger'
import { ReactElement } from 'react'
import getMenuItems from './getMenuItems'

type Props = {
  children: ReactElement | ReactElement[]
  title: string
} & ButtonProps

function Menu({ children, title, ...rest }: Props) {
  return (
    <MenuBase
      align="end"
      viewScroll="close"
      portal={true}
      arrow={true}
      menuButton={<Trigger {...rest} />}
    >
      <MenuHeader>{title}</MenuHeader>
      {getMenuItems(children)}
    </MenuBase>
  )
}

export { getMenuItems }

export default Menu
