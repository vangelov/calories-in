import { ButtonProps, chakra } from '@chakra-ui/react'
import MenuBase, { MenuItem } from 'components/general/Menu'
import { MoreHorizontal } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'
import { Trash2 } from 'react-feather'

const Trash2Styled = chakra(Trash2)

const MoreHorizontalStyled = chakra(MoreHorizontal)

type Props = {
  onRemove: () => void
} & ButtonProps

function Menu({ onRemove, ...rest }: Props) {
  return (
    <RightAligned>
      <MenuBase
        arrow
        align="end"
        viewScroll="close"
        menuButton={
          <ResponsiveIconButton
            aria-label="Ingredient actions"
            icon={<MoreHorizontalStyled size={20} pointerEvents="none" />}
            variant="ghost"
            {...rest}
          />
        }
      >
        <MenuItem onClick={onRemove}>
          <Trash2Styled pointerEvents="none" size={20} mr={3} />
          Remove ingredient
        </MenuItem>
      </MenuBase>
    </RightAligned>
  )
}

export default Menu
