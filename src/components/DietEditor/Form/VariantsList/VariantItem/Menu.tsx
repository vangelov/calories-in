import { ButtonProps, chakra } from '@chakra-ui/react'
import MenuBase, { MenuItem } from 'components/general/Menu'
import { MoreHorizontal } from 'react-feather'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'

const MoreHorizontalStyled = chakra(MoreHorizontal)

type Props = {
  onClone: () => void
  onEditName: () => void
  onDelete: () => void
  canRemove: boolean
} & ButtonProps

function Menu({ onDelete, onClone, onEditName, canRemove, ...rest }: Props) {
  return (
    <MenuBase
      arrow
      portal={true}
      viewScroll="close"
      menuButton={
        <ResponsiveIconButton
          withoutTooltip={true}
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
      <MenuItem onClick={onEditName}>Edit variant name</MenuItem>

      <MenuItem disabled={!canRemove} onClick={onDelete}>
        Delete variant
      </MenuItem>
    </MenuBase>
  )
}

export default Menu
