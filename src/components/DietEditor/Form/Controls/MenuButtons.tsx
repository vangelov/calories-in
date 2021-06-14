import { chakra } from '@chakra-ui/react'
import { Menu, MenuItem } from 'components/general'
import { useScreenSize } from 'core/ScreenSizeProvider'
import { MoreHorizontal, Shuffle, Trash } from 'react-feather'
import { ResponsiveIconButton } from 'components/general'

const ShuffleStyled = chakra(Shuffle)
const TrashStyled = chakra(Trash)
const MoreHorizontalStyled = chakra(MoreHorizontal)

function MenuButtons() {
  const screenSize = useScreenSize()
  const mr = screenSize >= 2 ? 1 : 2

  return (
    <Menu
      arrow
      align="end"
      viewScroll="close"
      menuButton={
        <ResponsiveIconButton
          mr={mr}
          aria-label="Meal plan actions"
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
      <MenuItem>
        <ShuffleStyled color="gray.400" pointerEvents="none" mr={3} />
        Re-arrange meals
      </MenuItem>
      <MenuItem>
        <TrashStyled color="gray.400" pointerEvents="none" mr={3} />
        Delete meal plan
      </MenuItem>
    </Menu>
  )
}

export default MenuButtons
