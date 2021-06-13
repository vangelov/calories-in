import { IconButton, chakra } from '@chakra-ui/react'
import { Menu, MenuItem } from 'components/general'
import { useScreenSize } from 'core/ScreenSizeProvider'
import { MoreHorizontal, Shuffle, Trash } from 'react-feather'

const ShuffleStyled = chakra(Shuffle)
const TrashStyled = chakra(Trash)
const MoreHorizontalStyled = chakra(MoreHorizontal)

function MenuButtons() {
  const screenSize = useScreenSize()
  const buttonSize = screenSize >= 2 ? 'sm' : 'md'
  const mr = screenSize >= 2 ? 1 : 2

  return (
    <Menu
      arrow
      align="end"
      viewScroll="close"
      menuButton={
        <IconButton
          size={buttonSize}
          mr={mr}
          aria-label="test"
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
