import { ButtonProps, chakra } from '@chakra-ui/react'
import { MoreHorizontal, Plus, Trash2 } from 'react-feather'
import { RightAligned } from 'layout'
import { ResponsiveIconButton, Menu as MenuBase, MenuItem } from 'general'

const PlusStyled = chakra(Plus)
const Trash2Styled = chakra(Trash2)

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
        <MenuItem onClick={onAddIngredient}>
          <PlusStyled pointerEvents="none" size={20} mr={3} />
          Add foods
        </MenuItem>
        <MenuItem onClick={onRemove}>
          <Trash2Styled pointerEvents="none" size={20} mr={3} />
          Remove meal
        </MenuItem>
      </MenuBase>
    </RightAligned>
  )
}

export default Menu
