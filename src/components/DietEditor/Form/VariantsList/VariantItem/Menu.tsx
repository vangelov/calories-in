import { ButtonProps, chakra } from '@chakra-ui/react'
import MenuBase, { MenuItem } from 'components/general/Menu'
import { MoreHorizontal, Trash2, Edit, Copy } from 'react-feather'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'

const MoreHorizontalStyled = chakra(MoreHorizontal)
const Trash2Styled = chakra(Trash2)
const EditStyled = chakra(Edit)
const CopyStyled = chakra(Copy)

type Props = {
  onClone: () => void
  onEditName: () => void
  onDelete: () => void
  canRemove: boolean
  isSelected: boolean
} & ButtonProps

function Menu({
  onDelete,
  onClone,
  onEditName,
  canRemove,
  isSelected,
  ...rest
}: Props) {
  return (
    <MenuBase
      arrow
      portal={true}
      viewScroll="close"
      menuButton={
        <ResponsiveIconButton
          isResponsive={false}
          aria-label="Variant actions"
          icon={<MoreHorizontalStyled size={20} pointerEvents="none" />}
          variant="ghost"
          {...rest}
          size="xs"
          borderRadius="full"
          _hover={{ backgroundColor: isSelected ? 'gray.200' : 'gray.100' }}
        />
      }
    >
      <MenuItem onClick={onClone}>
        <CopyStyled pointerEvents="none" size={20} mr={3} />
        Copy variant
      </MenuItem>

      <MenuItem onClick={onEditName}>
        <EditStyled pointerEvents="none" size={20} mr={3} />
        Rename variant
      </MenuItem>

      <MenuItem disabled={!canRemove} onClick={onDelete}>
        <Trash2Styled pointerEvents="none" size={20} mr={3} />
        Remove variant
      </MenuItem>
    </MenuBase>
  )
}

export default Menu
