import { ButtonProps } from '@chakra-ui/react'
import { MoreHorizontal } from 'react-feather'
import { RightAligned } from 'layout'
import { ResponsiveIconButton, Menu as MenuBase } from 'general'
import getMenuItems from './getMenuItems'

type Props = {
  onRemove: () => void
  onAddIngredient: () => void
  index: number
} & ButtonProps

function Menu({ index, onRemove, onAddIngredient, ...rest }: Props) {
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
        {getMenuItems({ onRemove, onAddIngredient })}
      </MenuBase>
    </RightAligned>
  )
}

export default Menu
