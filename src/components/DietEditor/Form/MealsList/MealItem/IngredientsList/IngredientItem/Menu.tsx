import { IconButton, chakra } from '@chakra-ui/react'
import { Menu as MenuBase, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'
import RightAligned from 'components/general/RightAligned'

const MoreHorizontalStyled = chakra(MoreHorizontal)

type Props = {
  onRemove: () => void
}

function Menu({ onRemove }: Props) {
  return (
    <RightAligned>
      <MenuBase
        arrow
        align="end"
        viewScroll="close"
        menuButton={
          <IconButton
            size="sm"
            aria-label="test"
            mr={1}
            icon={
              <MoreHorizontalStyled
                size={20}
                color="gray.400"
                pointerEvents="none"
              />
            }
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
