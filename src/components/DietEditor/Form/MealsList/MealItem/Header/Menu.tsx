import { ButtonProps, chakra } from '@chakra-ui/react'
import { MealField } from 'core/diets'
import MenuBase, { MenuItem } from 'components/general/Menu'
import { MoreHorizontal, Plus, Trash2 } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'

const PlusStyled = chakra(Plus)
const Trash2Styled = chakra(Trash2)

type Props = {
  mealField: MealField
  onRemove: () => void
  onAddIngredient: () => void
  index: number
} & ButtonProps

function Menu({ mealField, index, onRemove, onAddIngredient, ...rest }: Props) {
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
