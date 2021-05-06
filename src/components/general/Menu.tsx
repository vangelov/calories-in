import styled from '@emotion/styled'
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'

const StyledMenu = styled(Menu)`
  box-shadow: 0 3px 7px rgb(0 0 0 / 13%), 0 0.6px 2px rgb(0 0 0 / 10%) !important;
`

export { MenuButton, MenuItem }

export default StyledMenu
