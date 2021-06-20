import { ButtonProps, chakra } from '@chakra-ui/react'
import { Menu as MenuBase, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'
import { ResponsiveIconButton } from 'components/general'

const MoreHorizontalStyled = chakra(MoreHorizontal)

type Props = {
  onClone: () => void
  onDelete: () => void
} & ButtonProps

function Menu({ onDelete, onClone, ...rest }: Props) {
  return (
    <MenuBase
      arrow
      portal={true}
      menuButton={
        <ResponsiveIconButton
          aria-label="Ingredient actions"
          icon={<MoreHorizontalStyled size={20} pointerEvents="none" />}
          variant="ghost"
          {...rest}
          size="xs"
          borderRadius="full"
        />
      }
    >
      <MenuItem onClick={onClone}>Clone variant</MenuItem>
      <MenuItem onClick={onDelete}>Delete variant</MenuItem>
    </MenuBase>
  )
}

export default Menu
