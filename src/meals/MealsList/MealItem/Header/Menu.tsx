import { ButtonProps } from '@chakra-ui/react'
import { MoreHorizontal } from 'react-feather'
import { RightAligned } from 'layout'
import { ResponsiveIconButton, Menu as MenuBase } from 'general'
import { MenuItem } from 'general'
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
        menuButton={
          <ResponsiveIconButton
            aria-label="Meal actions"
            icon={<MoreHorizontal size={20} pointerEvents="none" />}
            variant="outline"
            _hover={{ backgroundColor: 'gray.200' }}
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
