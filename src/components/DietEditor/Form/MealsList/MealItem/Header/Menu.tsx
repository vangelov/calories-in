import { ButtonProps, chakra } from '@chakra-ui/react'
import { MealField } from 'core/dietForm'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import { Menu as MenuBase, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import { ResponsiveIconButton } from 'components/general'

const MoreHorizontalStyled = chakra(MoreHorizontal)
type Props = {
  mealField: MealField
  onRemove: () => void
  onAddIngredient: () => void
  index: number
} & ButtonProps

function Menu({ mealField, index, onRemove, onAddIngredient, ...rest }: Props) {
  const { mealStats } = useMealStats(index, mealField)

  useUpdateMealStats(index, mealStats)

  return (
    <RightAligned>
      <MenuBase
        arrow
        align="end"
        viewScroll="close"
        menuButton={
          <ResponsiveIconButton
            aria-label="Meal actions"
            icon={<MoreHorizontalStyled size={20} pointerEvents="none" />}
            variant="outline"
            {...rest}
          />
        }
      >
        <MenuItem onClick={onAddIngredient}>Add food</MenuItem>
        <MenuItem onClick={onRemove}>Remove</MenuItem>
      </MenuBase>
    </RightAligned>
  )
}

export default Menu
