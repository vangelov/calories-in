import { ButtonProps, chakra } from '@chakra-ui/react'
import { RightAligned } from 'layout'
import { ResponsiveIconButton, MenuItem, Menu as MenuBase } from 'general'
import { Trash2, Info, MoreHorizontal } from 'react-feather'

const InfoStyled = chakra(Info)
const Trash2Styled = chakra(Trash2)

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
            aria-label="Food actions"
            icon={<MoreHorizontal size={20} pointerEvents="none" />}
            variant="ghost"
            {...rest}
          />
        }
      >
        <MenuItem onClick={onRemove}>
          <Trash2Styled pointerEvents="none" size={20} mr={3} />
          Remove food
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <InfoStyled pointerEvents="none" size={20} mr={3} />
          View food details
        </MenuItem>
      </MenuBase>
    </RightAligned>
  )
}

export default Menu
