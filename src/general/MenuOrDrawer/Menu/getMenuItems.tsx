import {
  MenuItem,
  MenuOrDrawerItem,
  MenuOrDrawerSeparator,
  MenuDivider,
} from 'general'
import { cloneElement, ReactElement, Children } from 'react'

function getMenuItems(children: ReactElement | ReactElement[]) {
  return Children.map(children, (child: ReactElement) => {
    if (child.type === MenuOrDrawerItem) {
      const icon = cloneElement(child.props.icon, { size: 16, mr: 3 })

      return (
        <MenuItem
          disabled={child.props.isDisabled}
          onClick={child.props.onClick}
        >
          {icon}
          {child.props.children}
        </MenuItem>
      )
    } else if (child.type === MenuOrDrawerSeparator) {
      return <MenuDivider />
    }

    return null
  })
}

export default getMenuItems
