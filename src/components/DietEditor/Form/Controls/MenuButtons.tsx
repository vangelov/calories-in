import { IconButton, chakra } from '@chakra-ui/react'
import { Menu, MenuItem } from 'components/general'
import { MoreHorizontal, Shuffle, Trash } from 'react-feather'

const ShuffleStyled = chakra(Shuffle)
const TrashStyled = chakra(Trash)
const MoreHorizontalStyled = chakra(MoreHorizontal)

function MenuButtons() {
  return (
    <Menu
      arrow
      align="end"
      viewScroll="close"
      menuButton={
        <IconButton
          aria-label="test"
          icon={<MoreHorizontalStyled color="gray.400" pointerEvents="none" />}
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
