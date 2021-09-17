import { ButtonProps } from '@chakra-ui/react'
import { RightAligned } from 'layout'
import { ResponsiveIconButton, Menu as MenuBase } from 'general'
import { MoreHorizontal } from 'react-feather'
import getMenuItems from './getMenuItems'

type Props = {
  onRemove: () => void
} & ButtonProps

function Menu({ onRemove, ...rest }: Props) {
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
        {getMenuItems({ onRemove })}
      </MenuBase>
    </RightAligned>
  )
}

export default Menu
