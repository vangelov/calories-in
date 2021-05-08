import { IconButton } from '@chakra-ui/react'
import { MealField } from 'core/dietForm'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import { Menu as MenuBase, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import { MenuChangeEvent } from '@szhsin/react-menu'
import { useIsMounted } from 'core/utils'

type Props = {
  mealField: MealField
  onRemove: () => void
  index: number
  setIsMenuOpen: (value: boolean) => void
}

function Menu({ mealField, index, setIsMenuOpen, onRemove }: Props) {
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
            icon={<MoreHorizontal color="gray" pointerEvents="none" />}
            variant="ghost"
          />
        }
      >
        <MenuItem onClick={onRemove}>Remove</MenuItem>
      </MenuBase>
    </RightAligned>
  )
}

export default Menu
