import { IconButton, chakra } from '@chakra-ui/react'
import { MealField } from 'core/dietForm'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import { Menu as MenuBase, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import { MenuChangeEvent } from '@szhsin/react-menu'
import { useIsMounted } from 'core/utils'

const MoreHorizontalStyled = chakra(MoreHorizontal)
type Props = {
  mealField: MealField
  onRemove: () => void
  onAddIngredient: () => void
  index: number
  setIsMenuOpen: (value: boolean) => void
}

function Menu({
  mealField,
  index,
  setIsMenuOpen,
  onRemove,
  onAddIngredient,
}: Props) {
  const { mealStats } = useMealStats(index, mealField)
  const isMountedRef = useIsMounted()

  useUpdateMealStats(index, mealStats)

  function onMenuChange(event: MenuChangeEvent) {
    setTimeout(() => {
      if (isMountedRef.current) {
        setIsMenuOpen(event.open)
      }
    }, 0)
  }

  return (
    <RightAligned>
      <MenuBase
        arrow
        align="end"
        viewScroll="close"
        onChange={onMenuChange}
        menuButton={
          <IconButton
            aria-label="test"
            icon={
              <MoreHorizontalStyled color="gray.400" pointerEvents="none" />
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
