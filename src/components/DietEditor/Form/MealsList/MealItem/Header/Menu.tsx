import { IconButton, chakra } from '@chakra-ui/react'
import { MealField } from 'core/dietForm'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import { Menu as MenuBase, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import { useScreenSize } from 'core/ScreenSizeProvider'

const MoreHorizontalStyled = chakra(MoreHorizontal)
type Props = {
  mealField: MealField
  onRemove: () => void
  onAddIngredient: () => void
  index: number
}

function Menu({ mealField, index, onRemove, onAddIngredient }: Props) {
  const { mealStats } = useMealStats(index, mealField)
  const screenSize = useScreenSize()
  const buttonSize = screenSize >= 2 ? 'md' : 'sm'

  useUpdateMealStats(index, mealStats)

  return (
    <RightAligned>
      <MenuBase
        arrow
        align="end"
        viewScroll="close"
        menuButton={
          <IconButton
            size={buttonSize}
            aria-label="test"
            mr={3}
            icon={
              <MoreHorizontalStyled
                size={20}
                color="gray.400"
                pointerEvents="none"
              />
            }
            variant="outline"
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
