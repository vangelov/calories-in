import { ButtonProps } from '@chakra-ui/react'
import { RightAligned } from 'layout'
import { ResponsiveIconButton, Menu as MenuBase, MenuItem } from 'general'
import { MoreHorizontal } from 'react-feather'
import { ReactElement } from 'react'

type Props = {
  items: ReactElement<typeof MenuItem>[]
} & ButtonProps

function Menu({ items, ...rest }: Props) {
  return (
    <RightAligned>
      <MenuBase
        arrow
        align="end"
        viewScroll="close"
        portal={true}
        menuButton={
          <ResponsiveIconButton
            aria-label="Food actions"
            icon={<MoreHorizontal size={20} pointerEvents="none" />}
            variant="ghost"
            {...rest}
          />
        }
      >
        {items}
      </MenuBase>
    </RightAligned>
  )
}

export default Menu
