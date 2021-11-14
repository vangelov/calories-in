import styled from '@emotion/styled'
import {
  Menu as MenuBase,
  MenuButton,
  MenuItem,
  ControlledMenu as ControlledMenuBase,
  MenuDivider,
  MenuHeader,
} from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'

const bowShadow =
  'box-shadow: 0 3px 7px rgb(0 0 0 / 13%), 0 0.6px 2px rgb(0 0 0 / 10%) !important'

const Menu = styled(MenuBase)`
  ${bowShadow}
`

const ControlledMenu = styled(ControlledMenuBase)`
  ${bowShadow}
`

export { MenuButton, MenuItem, ControlledMenu, MenuDivider, MenuHeader }

export default Menu
