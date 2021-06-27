import { ButtonProps, chakra } from '@chakra-ui/react'
import MenuBase, { MenuItem } from 'components/general/Menu'
import { MoreHorizontal } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'

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
        <MenuItem onClick={onRemove}>Remove</MenuItem>
      </MenuBase>
    </RightAligned>
  )
}

export default Menu
